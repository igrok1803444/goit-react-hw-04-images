export const Searchbar = ({ handleFunction }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFunction}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="queryInput"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
