import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
	<div>find countries <input value={value} onChange={onChange} /></div>

const CountryName = ({ country, setNewFilter }) => {
	// console.log({ stateChanger })
	return (
		<>
			<p>{country.name.common} <button onClick={() => setNewFilter(country.name.common)}>show</button></p>
		</>
	)
}

const CountryDetailed = ({ country }) => {
	const [isLoading, setLoading] = useState(true);
	const [weather, setWeather] = useState([]);
	const languages = Object.values(country.languages)

	useEffect(() => {
		// console.log('weather')
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
			.then(response => {
				console.log(response.data)
				setWeather(response.data)
				setLoading(false);
				console.log(weather.icon)
			})
	}, [country.capital, weather.icon])

	if (isLoading) {
		return <div>Loading...			<img alt={`Weather of ${country.capital}`}
			title={`Weather of ${country.capital}`}
			src={`http://openweathermap.org/img/wn/02n@2x.png`}>
		</img></div>;
	}

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
			<h2>Weather in {country.capital}</h2>
			<p>temperature {weather.main.temp} Celsius</p>
			<img alt={`Weather of ${country.capital}`}
				title={`Weather of ${country.capital}`}
				src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}>
			</img>
			<p>wind {weather.wind.speed} m/s</p>
		</>
	)
}

const Countries = ({ countries, setNewFilter }) => {
	if (countries.length > 10) {
		return (<p>Too many matches, specify another filter</p>)
	}
	if (countries.length === 1) {
		return (<CountryDetailed country={countries[0]} />)
	}
	return (
		<>
			{countries.map((country, i) =>
				<CountryName key={i} country={country} setNewFilter={setNewFilter} />
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
			<Countries countries={countriesToShow} setNewFilter={setNewFilter} />
		</div>
	);
}

export default App;