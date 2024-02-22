import Person from "./Person";

const FilteredPersons = ({ filteredItems }) => {
  return (
    <ul className="list">
      {filteredItems.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </ul>
  );
};

export default FilteredPersons;
