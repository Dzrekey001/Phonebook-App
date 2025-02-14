function Form({ newName, newNumber, setNewName, setNumber, submitName }) {
    return (
        <form onSubmit={submitName}>
            <div className="form-input">
                name: <input value={newName} onChange={(event) => setNewName(() => event.target.value)} />
            </div>
            <div className="form-input">
                number: <input value={newNumber} onChange={(event) => setNumber(() => event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;