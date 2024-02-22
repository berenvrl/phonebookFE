import Button from "./Button";

function Person({ person, handleDeletePerson }) {
  return (
    <li>
      <span id="addedperson">
        {person.name} {person.number}
      </span>
      <Button
        className="btn delete"
        onClick={() => handleDeletePerson(person)}
        src="delete.svg"
        text="Delete"
      />
    </li>
  );
}

export default Person;
