const Filter = ({ search, setSearch }) => {
  return (
    <div className="filterdiv">
      Filter shown with
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type for search"
      />
    </div>
  );
};

export default Filter;
