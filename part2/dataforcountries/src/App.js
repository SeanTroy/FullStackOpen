import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
	<div>find countries <input value={value} onChange={onChange} /></div>

const CountryName = ({ country, setNewFilter }) => {
	console.log({ setNewFilter })
	return (
		<>
			<p>{country.name.common} <button>show</button></p>
		</>
	)
}

const CountryDetailed = ({ country }) => {
	const languages = Object.values(country.languages)
	return (
		<>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<p><b>languages:</b></p>
			<ul>
				{languages.map((language, i) =>
					<li key={i}>{language}</li>
				)}
			</ul>
			<img alt={`Flag of ${country.name.common}`}
				title={`Flag of ${country.name.common}`}
				src={country.flags.png}>
			</img>
		</>
	)
}

const Countries = ({ countries, parentCallback }) => {
	if (countries.length > 10) {
		return (<p>Too many matches, specify another filter</p>)
	}
	if (countries.length === 1) {
		return (<CountryDetailed country={countries[0]} />)
	}
	return (
		<>
			{countries.map((country, i) =>
				<CountryName key={i} country={country} />
			)}
		</>
	)
}

function App() {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		// console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				// console.log('Countries retrieved')
				// console.log(response.data)
				setCountries(response.data)
			})
	}, [])

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	const countriesToShow = newFilter === ''
		? []
		: countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

	return (
		<div>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<Countries countries={countriesToShow} />
			<button onClick={() => setNewFilter("Finland")}>show Finland</button>
		</div>
	);
}

export default App;