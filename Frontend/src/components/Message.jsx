function Message({ message, color }) {
    if (message === null ) return null;

    return (
        <>
            <p className="message" style={{color}} >{message}</p>
        </>
    )
}

export default Message;