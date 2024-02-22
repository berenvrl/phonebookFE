import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const PersonsForm = ({
  search,
  setSearch,
  filteredItems,
  persons,
  handleDeletePerson,
  handleAddBtn,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  visible,
  handleToggle,
  handleLogOut,
}) => {
  return (
    <div className="mainpage">
      <button className=" btn logout" onClick={handleLogOut}>
        Log Out
      </button>
      <div className="filterdiv">
        <Filter search={search} setSearch={setSearch} />
        <button className="btn createnew" onClick={handleToggle}>
          {visible ? "close X" : "add contact +"}
        </button>
      </div>
      {visible && (
        <PersonForm
          handleAddBtn={handleAddBtn}
          newName={newName}
          newNumber={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
        />
      )}
      <div className="personsdiv">
        <h3 style={{ padding: "20px 0" }}>Numbers</h3>
        {persons.length === 0 ? (
          <p>You have no any contact saved yet</p>
        ) : (
          <Persons
            search={search}
            filteredItems={filteredItems}
            persons={persons}
            handleDeletePerson={handleDeletePerson}
          />
        )}
      </div>
    </div>
  );
};

export default PersonsForm;
