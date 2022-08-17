import { useState } from 'react'

const Filter = ({ value, onChange }) =>
	<div>filter shown with <input value={value} onChange={onChange} /></div>

const PersonForm = ({ addName, newName, onNameChange, newNumber, onNumberChange }) => {
	return (
		<form onSubmit={addName}>
			<div>name: <input value={newName} onChange={onNameChange} /></div>
			<div>number: <input value={newNumber} onChange={onNumberChange} /></div>
			<div><button type="submit">add</button></div>
		</form>
	)
}

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons }) => {
	return (
		<>
			{persons.map(person =>
				<Person key={person.name} name={person.name} number={person.number} />
			)}
		</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	const addName = (event) => {
		event.preventDefault()
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const nameObject = { name: newName, number: newNumber }
			setPersons(persons.concat(nameObject))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	const personsToShow = newFilter === ''
		? persons
		: persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<h3>add a new</h3>
			<PersonForm addName={addName} newName={newName} onNameChange={handleNameChange}
				newNumber={newNumber} onNumberChange={handleNumberChange} />
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	)
}

export default App