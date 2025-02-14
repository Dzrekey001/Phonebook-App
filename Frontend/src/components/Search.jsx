function Search({ filter, handleFilter }) {
    return (
        <>
            Search: <input value={filter} onChange={handleFilter} />
        </>
    )
}

export default Search;