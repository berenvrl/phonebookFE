import { useState, useEffect } from "react";
import personsService from "./services/personsService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);

  //clear input field after events
  const handleClearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  //getting all data from db
  const getpersons = () => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        shownotification("Fail getting contact numbers!", true);
        console.error(err);
      });
  };

  useEffect(getpersons, []);

  //adding a contact to a db
  const handleAddBtn = (e) => {
    e.preventDefault();

    const newaddedName = {
      name: newName,
      number: newNumber,
    };

    const ifContactExists = persons.some(
      (person) =>
        person.name.toLowerCase() === newName.toLowerCase() &&
        person.number !== newNumber
    );

    const ifContactExistsAsWhole = persons.some(
      (person) =>
        person.name.toLowerCase() === newName.toLowerCase() &&
        person.number === newNumber
    );

    if (ifContactExists) {
      const isconfirmed = window.confirm(
        `${newName} is already added to your phone book, replace the old number with a new one?`
      );

      const oldidObj = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      //if name exists but number is different, update number only
      isconfirmed && updatenumber(oldidObj.id, newaddedName);
    } else if (ifContactExistsAsWhole) {
      alert(`${newName} and ${newNumber} is already added!`);
      handleClearInput();
    } else {
      //create a new contact

      if (newName && newNumber) {
        personsService
          .create(newaddedName)
          .then((returnedperson) => {
            setPersons([...persons, returnedperson]);
            handleClearInput();
            shownotification(`${newName} added!`, false);
          })
          .catch((err) => {
            shownotification("Addition fail!", true);
          });
      } else {
        alert("Fill name and number input!");
      }
    }
  };

  //deleting a contact from db
  const handleDeletePerson = (person) => {
    const confirmdelete = window.confirm(
      `Are you sure want to delete ${person.name} ?`
    );

    if (confirmdelete) {
      const url = `${personsService.baseUrl}/${person.id}`;

      personsService
        .deletePerson(url)
        .then((returneddata) => {
          setPersons(
            persons.filter((item) => {
              return item.id !== person.id;
            })
          );
          shownotification(`${person.name} deleted!`, false);
        })
        .catch((err) => {
          shownotification(
            `${person.name} was already deleted from the server!`,
            true
          );
          setPersons(persons.filter((obj) => obj.id !== person.id));
        });
    }
  };

  //update contact number
  //***currently doesnt work because its not handled in backend */
  const updatenumber = (id, newObj) => {
    if (newObj.number) {
      personsService
        .update(id, newObj)
        .then((returneddata) => {
          setPersons(
            persons.map((person) =>
              person.id === id ? { ...person, number: newObj.number } : person
            )
          );
          handleClearInput();
          shownotification(`${newObj.name} contact updated!`, false);
        })
        .catch((err) => {
          shownotification("Update fail!", true);
        });
    } else {
      alert("Please fill number!");
    }
  };

  //filter contact by typing
  useEffect(() => {
    const handleSearchFilter = (e) => {
      const listtofilter = persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredItems(listtofilter);

      search &&
        shownotification(
          `There are ${listtofilter.length} people found!`,
          false
        );
    };

    handleSearchFilter();
  }, [search]);

  //for displaying notifications 3 sec
  const dontshownotification = () => {
    setTimeout(() => {
      setNotificationMessage(
        (notificationMessage) => (notificationMessage = null)
      );
    }, 3000);
  };

  //content, color and duration of a notification
  const shownotification = (text, isError) => {
    setNotificationMessage(text);
    setError(isError);
    dontshownotification();
  };

  return (
    <div className="app">
      <h2 style={{ marginBottom: "70px" }}>Phonebook</h2>
      {notificationMessage && (
        <Notification message={notificationMessage} error={error} />
      )}
      <Filter search={search} setSearch={setSearch} />
      <h3 style={{ padding: "10px 0" }}>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAddBtn={handleAddBtn}
      />
      <h3 style={{ padding: "20px 0" }}>Numbers</h3>
      <Persons
        search={search}
        filteredItems={filteredItems}
        persons={persons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
