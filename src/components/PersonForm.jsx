import InputField from "./InputField";
import Button from "./Button";

const PersonForm = ({
  handleAddBtn,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <div className="form" data-testid="person-form">
      <h3>Add a Contact</h3>
      <InputField
        className="formdiv"
        type="text"
        value={newName}
        name="Name"
        placeholder="Enter a name"
        onChange={(e) => setNewName(e.target.value)}
        id="newName"
      />
      <InputField
        className="formdiv"
        type="text"
        value={newNumber}
        name="Number"
        placeholder="Number: XX-XXXXXXXX"
        onChange={(e) => setNewNumber(e.target.value)}
        id="newNumber"
      />
      <Button
        className="btn add"
        onClick={handleAddBtn}
        src="save.svg"
        text="Add"
      />
    </div>
  );
};

export default PersonForm;
