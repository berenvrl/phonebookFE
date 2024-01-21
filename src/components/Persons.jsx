import Person from "./Person";

const Persons = ({ search, filteredItems, persons, handleDeletePerson }) => {
  return (
    <div className="list">
      {search ? (
        <ul>
          {filteredItems.map((person) => (
            <Person person={person} key={person.id} />
          ))}
        </ul>
      ) : (
        <ul>
          {persons.map((person) => (
            <Person
              person={person}
              key={person.id}
              handleDeletePerson={handleDeletePerson}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Persons;
