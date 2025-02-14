import Person from "./Person";
import DeleteContact from "./DeleteContact";

function DisplayContact({ filterPersons, onDelete }) {
    return (
        <div>
            <ul>
                {
                    filterPersons.map((person) =>{
                    return (
                    <div key={person.id}>
                        <Person name={person.name} contact={person.number} />
                        <DeleteContact onDelete={onDelete} id={person.id}/>
                    </div>)
                    }
                    )
                }
            </ul>
        </div>
    )
}

export default DisplayContact;