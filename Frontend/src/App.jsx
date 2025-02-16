import { useEffect, useState } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import DisplayContact from './components/DisplayContact'
import ContactService from './services/contact'
import Message from './components/Message'
import './style/index.css'

const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  useEffect(()=>{
    ContactService.getAllContact()
    .then((data)=>{
      setPersons(data)
      setFilterPersons(data)
    })
  },[])

  useEffect(() => {
    if (persons) setFilterPersons(persons)
  }, [persons])

  function handleFilter(event) {
    const value = event.target.value;
    setFilter(value)
    const filteredPerson = persons.filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
    setFilterPersons(filteredPerson)
  }
  function onDelete (id) {
    ContactService.deleteContact(id)
    .then((data)=>{
      setPersons(persons.filter((p)=>p.id !== data.id))
      setColor('red')
      setMessage(`${data.name} Deleted!`)
      setTimeout(()=> setMessage(null), 2000)
    }).catch((err)=>{
      const p = persons.find((per)=> per.id === id)
      setColor('red')
      setPersons(persons.filter((a)=> a.id !== id))
      setMessage(`${p.name} already deleted from the Server!`)
      setTimeout(()=> setMessage(null),2000)
    })
  }

  if (persons === null) return null;



  function submitName(event) {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some((p) => p.name === newPerson.name)) {
      if (window.confirm(`"${newPerson.name}" exist. Do you want to replace contact?`)) {
        ContactService.updateContact(persons.find((p) => p.name === newPerson.name).id, {number: newPerson.number})
        .then((data)=> {
          setPersons(persons.map((p)=> p.id === data.id? data: p))
          setColor("green")
          setMessage(`"${newPerson.name}" contact updated!`)
          setTimeout(()=> setMessage(null),2000)
        }).catch((err)=>{
          setColor("red")
          setMessage(`User does exits!`)
          setPersons((prev)=> prev.filter((p)=> newPerson.name !== p.name))
          setTimeout(()=> setMessage(null),2000)
        })
      }
    } else {
      ContactService.saveContact(newPerson)
      .then((data)=>{
        setColor('green')
        setMessage(`${data.name} Added!`)
        setPersons((prevPersons) => [...prevPersons, data])
        setTimeout(()=>{
          setMessage(null)
        }, 2000)
      })
      setNewName('')
      setNumber('')
  }}


  return (
    <div>
      <div>
        <Search filter={filter} handleFilter={handleFilter} />
      </div>
      <h2>Add Contact</h2>
      <Message message={message} color={color}/>
      <Form newName={newName} newNumber={newNumber} setNewName={setNewName} setNumber={setNumber} submitName={submitName} />

      <h2>Phonebook</h2>
      <DisplayContact filterPersons={filterPersons} onDelete={onDelete} />
    </div>
  )
}

export default App;