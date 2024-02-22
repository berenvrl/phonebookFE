import InputField from "./InputField";

const Filter = ({ search, setSearch }) => {
  return (
    <div className="filtercontact">
      <h3>Filter Contact</h3>
      <InputField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type for search"
        style={{ borderRadius: "17px" }}
      />
    </div>
  );
};

export default Filter;
