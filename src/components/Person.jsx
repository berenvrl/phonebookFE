function Person({ person, handleDeletePerson }) {
  return (
    <li>
      <span>
        {person.name} {person.number}
      </span>
      <button className="btn delete" onClick={() => handleDeletePerson(person)}>
        delete
      </button>
    </li>
  );
}

export default Person;
