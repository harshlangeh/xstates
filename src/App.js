import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');


  // Fetch countries on initial render
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);


 // Fetch states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    } else {
      setStates([]);
    }
    setSelectedState('');
    setCities([]);
    setSelectedCity('');
  }, [selectedCountry]);



  // Fetch cities when selectedState changes
  useEffect(() => {
    if (selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
    }
    setSelectedCity('');
  }, [selectedState]);





  return (
    <div className="">

      <div className='Cpp'>

      <div>
        <label>Select Country:</label>
        <select value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
          <option value="" disabled >Select Country</option>
          {countries.map( country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Select State:</label>
        <select value={selectedState} onChange={(e)=> setSelectedState(e.target.value)}>
          <option value="" disabled>Select State</option>
          {states.map((state)=>(
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Select City:</label>
        <select value={selectedCity} disabled={!selectedState} onChange={(e)=>setSelectedCity(e.target.value)}>
          <option value="" disabled>Select City</option>
          {cities.map((city)=>(
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      </div>

      

      {selectedCity && selectedState && selectedCountry && (
        <div>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </div>
      )}



    </div>
  );
}

export default App;
