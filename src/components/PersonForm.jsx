const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAddBtn,
}) => {
  return (
    <form className="form">
      <div>
        Name:{" "}
        <input
          placeholder="Enter a name"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        Number:{" "}
        <input
          placeholder="Enter a number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <button className="btn add" type="submit" onClick={handleAddBtn}>
        add
      </button>
    </form>
  );
};

export default PersonForm;
