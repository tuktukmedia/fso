import { useState, useEffect } from 'react'
import personServices from './services/persons.js'
import Form from './components/Form.js'
import Filter from './components/Filter.js'
import ListNumbers from './components/ListNumbers.js'
import Notification from './components/Notification.js'

const App = () => {
  //Luettelen ihmiset
  const [persons, setPersons] = useState([]) 

  //Haetaan ihmiset json-serveriltä. useeffectin avulla vain kerran.
  useEffect(() => {
    console.log('Haetaan tiedot')
    personServices.getAll()
      .then(response => {
        console.log('Tiedot haettu')
        setPersons(response.data)
      })
  }, [])

  // Uusi nimi input fieldistä tallennetaan tähän
  const [newName, setNewName] = useState('')
  
  // Uusi numero input fieldistä tallennetaan tähän
  const [newNumber, setNewNumber] = useState('')
  
  // Kun filtteri inputti aletaan täyttämään, tämä vaihtuu falseksi, ei näytetä kaikkia vaan suodatetaan
  const [showAll, setShowAll] = useState(true)

  // filtteri inputin sisältö tallennetaan tähän
  const [newFilter, setNewFilter] = useState('')

  const [positive, setPositive] = useState('positiveMessage')
  const [message, setMessage] = useState(null)

  // nimi ja numero inputtien kirjoituksen tallennus stateen
  const handleInputName = (event) => setNewName(event.target.value)
  const handleInputNumber = (event) => setNewNumber(event.target.value)
  
  // filtteri inputin sisällön tallennus stateen ja vaihdetaan kaikkien näyttäminen suodatukseen
  const handleInputFilter = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  // lomakkeen käsittely lähetyksen jälkeen
  const handleSubmit = (event) => {
    //estetään vakiotoiminta, joka lataa kokosivun uudestaan lähetyksen myötä
    event.preventDefault()
   
    
    //onko nimi jo lisätty. muutetaan kaikki lowercase, että Arto ja arto ovat samoja. 
    const isUnique = persons.find(n=>n.name.toLowerCase() === newName.toLowerCase())
 

    if (!isUnique){
      const phoneBookObject = {
        name: newName,
        number: newNumber
      }
      personServices.create(phoneBookObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`Added ${response.data.name}`)
        setPositive("positiveMessage")
        setTimeout(()=>{
          setMessage(null)
        },4000)
      
      })
      
    }
     else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const phoneBookObject = {
          name: newName,
          number: newNumber}
          const personToUpdate = persons.find(n=>n.name === newName)
        personServices.update(personToUpdate.id, phoneBookObject)
        .then(response => {
          setPersons(persons.map(person => 
            (person.id !== personToUpdate.id ? person=person : person=response.data )))
            setMessage(`Updated number of ${personToUpdate.name}`)
            setPositive("positiveMessage")
            setTimeout(()=> {
              setMessage(null)
            },4000)
          })
        .catch(err => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setPositive("negativeMessage")
          setTimeout(()=> {
            setMessage(null)
          }, 4000)
          personServices.getAll()
          .then(response => {
            setPersons(response.data)
          })
        })
      }
    }

    //nollataan inputin kentät
    setNewName('')
    setNewNumber('')
  }
  
  const handleDelete = (id,name) => {
    if(window.confirm(`Delete ${name}?`)){
      personServices.remove(id)
      .then(response => {
        setPersons(persons.filter(n => n.id !== id))
      })
      .catch(err => {
        setMessage(`Information of ${name} has already been removed from server`)
        setPositive("negativeMessage")
        setTimeout(()=> {
          setMessage(null)
        }, 4000)
        personServices.getAll()
          .then(response => {
            setPersons(response.data)
          })
      })
    }
  }
  // näytetään koko lista tai jos showall = false näytetään inputilla suodatettu lista. 
  const filteredList = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
   
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} positive={positive} />

        <Filter handleInputFilter={handleInputFilter} />

      <h2>Add a new</h2>

      <Form handleSubmit={handleSubmit} handleInputName={handleInputName} newName={newName} handleInputNumber={handleInputNumber} newNumber={newNumber} />
      
      <h2>Numbers</h2>
      
      
          <ListNumbers filteredList={filteredList} handleDelete={handleDelete} />
      
      
    </div>
  )
}

export default App