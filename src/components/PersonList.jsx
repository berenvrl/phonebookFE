import Person from "./Person";

const PersonList = ({ persons, handleDeletePerson }) => {
  return (
    <ul className="list">
      {persons.map((person) => (
        <Person
          person={person}
          key={person.id}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default PersonList;
