function DeleteContact({onDelete, id}) {
    return(
        <>
            <button onClick={()=> onDelete(id)}>Delete</button>
        </>
    )
}

export default DeleteContact;