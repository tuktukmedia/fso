import { useEffect, useState } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

//Hakukenttä
const Input = ({handleInputFilter}) => 
  <div>
    Find countries <input onChange={handleInputFilter} />
  </div>

//Listaus maista, maan nimi ja painike. Painikkeen valuen avulla käsittelijä tietää, mikä maa pitää näyttää
const CountryList = ({name, clickShow}) =>  
    <div>
        {name} <button onClick={clickShow} value={name}>show</button>
    </div>
 


const App = () => {

   const [countries, setCountries] = useState([])
   const [search, setSearch] = useState('')
   const [showAll, setShowAll] = useState(true)
   

   useEffect(() => {
    console.log('Maahaku aloitettu')
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
           console.log('Maahaku valmis')
           setCountries(response.data) 
        })
   }, [])

   
   //Show-painikkeen käsittelijä. Asettaa painikkeen valuen, eli maan koko nimen hakulauseeksi, jolloin se näytetään automaattisesti
   const clickShow = (event) => setSearch(event.target.value)

   //heti kun jotain kirjoitetaan kenttää, otetaan input talteen ja vaihdetaan ShowAll muotoon, että maalistaa pitää suodattaa
   const handleInputFilter = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
   }
   
   // jos showAll true, eli ei ole kirjoitettu mitään hakukenttään, maa-lista on alkuperäinen haettu. Muuten suodatetaan käyttöön uusi lista.
   const filteredCountries = showAll  ? countries : 
        countries.filter(country => JSON.stringify(country.name.common).toLowerCase().includes(search.toLowerCase()))
   

   return (
      <div>
       <h1>Country database search</h1>
       <Input handleInputFilter={handleInputFilter} />

       {/* sen mukaan onko matchaavia tuloksia kaikki, yli 10, alle 10, yksi tai ei ollenkaan valitaan oikea näkymä */}
       {showAll ? '' : (filteredCountries.length == 1 ? filteredCountries.map(country => <CountryInfo data={country} key={country.name.common}  />) : 
        (filteredCountries.length > 10 ? 'Too many matches, specify another filter': 
        filteredCountries.length == 0 ? 'no countries found' : filteredCountries.map(country => <CountryList clickShow={clickShow} key={country.name.official} name={country.name.common} />) )
        )}
      </div>
    );
  }
  
  export default App;
  