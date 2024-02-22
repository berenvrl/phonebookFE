import { useState, useEffect } from "react";
import personsService from "./services/personsService";
import Notification from "./components/Notification";
import PersonsForm from "./components/PersonsForm";
import RegisterForm from "./components/RegisterForm";
import loginService from "./services/login";
import registerService from "./services/register";
import TotalLoginArea from "./components/TotalLoginArea";
import LogoDiv from "./components/LogoDiv";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [clickedRegister, setClickRegister] = useState(false);
  //user authentication
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [newUser, setNewUser] = useState(null);

  //Functions
  const clearInputField = () => {
    setUsername("");
    setPassword("");
  };

  const handleToggle = () => {
    setVisible((visible) => !visible);
  };
  const handleRegister = () => {
    setClickRegister(true);
    clearInputField();
  };
  //clear input field after events
  const handleClearInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      //to save user info to local storage for making info saved when browser is refreshed
      window.localStorage.setItem("loggedPersonAppUser", JSON.stringify(user));

      personsService.setToken(user.token);

      setUser(user);
      clearInputField();

      const initialPersons = await personsService.getAll();
      window.localStorage.setItem(
        "loggedInitialPersons",
        JSON.stringify(initialPersons)
      );
      setPersons(initialPersons);
    } catch {
      shownotification("Username and password should be correct", true);
      dontshownotification();
    }
  };
  const handleLogOut = async () => {
    setUser(null);
    clearInputField();
    window.localStorage.removeItem("loggedPersonAppUser");
  };

  const handleUserCreation = async (event) => {
    event.preventDefault();
    try {
      const newUser = await registerService.setusers({
        username,
        name,
        password,
      });

      if (username && name && password) {
        setNewUser(newUser);
        clearInputField();
        setName("");
        shownotification(`${newUser.name} registered!`);
        setClickRegister(false);
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      shownotification(`${errorMessage}`, true);
      dontshownotification();
      setName("");
      clearInputField();
    }
  };

  const makeUserNameNice = (word) => {
    let words = word.split(" ");
    let result = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    return result.join(" ");
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPersonAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personsService.setToken(user.token);
      getpersons();
    }
  }, []);

  //Functions for database arrangements

  //getting all data from db
  const getpersons = async () => {
    try {
      const initialPersons = await personsService.getAll();
      window.localStorage.setItem(
        "loggedInitialPersons",
        JSON.stringify(initialPersons)
      );
      setPersons(initialPersons);
    } catch (err) {
      shownotification("Fail getting contact numbers!", true);
      console.error(err);
    }
  };
  //adding a contact to a db
  const handleAddBtn = async (e) => {
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
      try {
        const returnedperson = await personsService.create(newaddedName);

        setPersons([...persons, returnedperson]);
        handleClearInput();
        shownotification(`${newName} added!`, false);
      } catch (err) {
        console.log(err.message);
        shownotification(`${err.response.data.error}`, true);
        handleClearInput();
      }

      setVisible((visible) => !visible);
    }
  };
  //deleting a contact from db
  const handleDeletePerson = async (person) => {
    const loggedUserJSON = window.localStorage.getItem("loggedPersonAppUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      personsService.setToken(loggedUser.token);

      const confirmdelete = window.confirm(
        `Are you sure want to delete ${person.name} ?`
      );
      if (confirmdelete) {
        const url = `${personsService.baseUrl}/${person.id}`;

        try {
          await personsService.deletePerson(url);

          setPersons(
            persons.filter((item) => {
              return item.id !== person.id;
            })
          );
          shownotification(`${person.name} deleted!`, false);
        } catch (err) {
          console.log(err);
          shownotification(
            `${person.name} was already deleted from the server!`,
            true
          );
          setPersons(persons.filter((obj) => obj.id !== person.id));
        }
      }
    }
  };
  //update contact number in db
  const updatenumber = async (id, newObj) => {
    const loggedUserJSON = window.localStorage.getItem("loggedPersonAppUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      personsService.setToken(loggedUser.token);

      try {
        await personsService.update(id, newObj);
        setPersons(
          persons.map((person) =>
            person.id === id ? { ...person, number: newObj.number } : person
          )
        );

        handleClearInput();
        shownotification(`${newObj.name} contact updated!`, false);
      } catch (err) {
        console.log(err);
        shownotification("Update fail!", true);
      }
    }
  };

  //filter persons by typing
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

  //for displaying notifications 4 sec
  const dontshownotification = () => {
    setTimeout(() => {
      setNotificationMessage(
        (notificationMessage) => (notificationMessage = null)
      );
    }, 4000);
  };

  //content, color and duration of a notification
  const shownotification = (text, isError) => {
    setNotificationMessage(text);
    setError(isError);
    dontshownotification();
  };

  const appClassName = !user ? "app" : "app2";
  const logodiv = !user ? "logodiv" : "logodiv2";

  return (
    <div className={appClassName}>
      <LogoDiv
        user={user}
        logodiv={logodiv}
        makeUserNameNice={makeUserNameNice}
      />
      <div className="rightside">
        <h2>
          {!user
            ? `${
                clickedRegister
                  ? "Register to Application"
                  : "Login to Application"
              }`
            : "Phonebook"}
        </h2>
        {notificationMessage && (
          <Notification message={notificationMessage} error={error} />
        )}
        {!user ? (
          <>
            {!clickedRegister ? (
              <TotalLoginArea
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
              />
            ) : (
              <RegisterForm
                handleUserCreation={handleUserCreation}
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                username={username}
                setUsername={setUsername}
                setClickRegister={setClickRegister}
              />
            )}
          </>
        ) : (
          <PersonsForm
            search={search}
            setSearch={setSearch}
            filteredItems={filteredItems}
            persons={persons}
            handleDeletePerson={handleDeletePerson}
            handleAddBtn={handleAddBtn}
            newName={newName}
            newNumber={newNumber}
            setNewName={setNewName}
            setNewNumber={setNewNumber}
            visible={visible}
            handleToggle={handleToggle}
            handleLogOut={handleLogOut}
          />
        )}
      </div>
    </div>
  );
};

export default App;
