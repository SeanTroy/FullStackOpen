import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
	<div>find countries <input value={value} onChange={onChange} /></div>

const Language = ({ language }) => <li>{language}</li>

const CountryName = ({ country }) => <p>{country.name.common}</p>

const CountryDetailed = ({ country }) => {
	// console.log('country data', {country})
	return (
		<>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<p><b>languages:</b></p>
			<ul>
				{Object.values(country.languages).map((language, i) =>
					<Language key={i} language={language} />
				)}
			</ul>
			<img alt={"Flag of " + country.name.common}
				title={"Flag of " + country.name.common}
				src={country.flags.png}>
			</img>
		</>
	)
}

const Countries = ({ countries }) => {
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
		</div>
	);
}

export default App;