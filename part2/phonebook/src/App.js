import { useState, useEffect } from 'react'
import axios from 'axios'

const ListNumbers = ({name, number}) => 
  <p>
    {name} {number}
  </p>

const Filter = ({handleInputFilter}) => 
  <div>
    filter shown with <input onChange={handleInputFilter} />
  </div>

const Form = ({handleSubmit, handleInputName, newName, handleInputNumber, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}  >
      <div>
         name: <input onChange={handleInputName} value={newName} />
      </div>
      <div>
         number: <input onChange={handleInputNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
} 

const App = () => {
  //Luettelen ihmiset
  const [persons, setPersons] = useState([]) 

  //Haetaan ihmiset json-serveriltä. useeffectin avulla vain kerran.
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // Uusi nimi input fieldistä tallennetaan tähän
  const [newName, setNewName] = useState('')
  
  // Uusi numero input fieldistä tallennetaan tähän
  const [newNumber, setNewNumber] = useState('')
  
  // Kun filtteri inputti aletaan täyttämään, tämä vaihtuu falseksi, ei näytetä kaikkia vaan suodatetaan
  const [showAll, setShowAll] = useState(true)

  // filtteri inputin sisältö tallennetaan tähän
  const [newFilter, setNewFilter] = useState('')

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
   
    //console.log('Tarkista onko duplikaatti', JSON.stringify(persons).includes( newName )) 
    
    //onko nimi jo lisätty. muutetaan kaikki lowercase, että Arto ja arto ovat samoja. Objectista ei löydy mitään ellei ensin muuta stringiksi
    const isUnique = JSON.stringify(persons).toLowerCase().includes( newName.toLowerCase() )
    //  pelkkä etunimi antaa edelleen duplikaatin

     // jos ei vielä listalla, tehdään uusi objekti ja lisätään persons-listaan. Jos duplikaatti, annetaan virheilmoitus 
    if (!isUnique){
      const phoneBookObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(phoneBookObject))
    }
     else {
      alert(`${newName} is already added to phonebook`)
    }

    //nollataan inputin kentät
    setNewName('')
    setNewNumber('')
  }

  // näytetään koko lista tai jos showall = false näytetään inputilla suodatettu lista. stringiksi muutos koska objekti ja lowercase jotta Arto=arto
  // tässä määriteltävää suodatettua/suodattamatonta listaa käytetään alla ja mapataan jokainen rivi
  const filteredList = showAll
    ? persons
    : persons.filter(person => JSON.stringify(person).toLowerCase().includes(newFilter.toLowerCase()))
    
   
  return (
    <div>
      <h1>Phonebook</h1>

        <Filter handleInputFilter={handleInputFilter} />

      <h2>Add a new</h2>

      <Form handleSubmit={handleSubmit} handleInputName={handleInputName} newName={newName} handleInputNumber={handleInputNumber} newNumber={newNumber} />
      
      <h2>Numbers</h2>
      
      {filteredList.map(list => 
          <ListNumbers key={list.name} name={list.name} number={list.number} />
        )}
      
    </div>
  )
}

export default App