import FilteredPersons from "./FilteredPersons";
import PersonList from "./PersonList";

const Persons = ({ search, filteredItems, persons, handleDeletePerson }) => {
  return (
    <div>
      {search ? (
        <FilteredPersons filteredItems={filteredItems} />
      ) : (
        <PersonList persons={persons} handleDeletePerson={handleDeletePerson} />
      )}
    </div>
  );
};

export default Persons;
