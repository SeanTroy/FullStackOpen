import { useState, useEffect } from 'react'
import nameService from './services/phonebook'

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

const Person = ({ name, number, id, setPersons }) => {
	const deleteNote = id => {
		if (window.confirm(`Delete ${name}?`)) {
			nameService.remove(id)
				.then(() =>
					nameService.getAll()
						.then(newNames => {
							setPersons(newNames)
						}))
		}
	}

	return (
		<p>{name} {number} <button onClick={() => deleteNote(id)}>delete</button></p>
	)
}

const Persons = ({ persons, setPersons }) => {
	return (
		<>
			{persons.map(person =>
				<Person key={person.name} name={person.name} number={person.number} id={person.id} setPersons={setPersons} />
			)}
		</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		nameService
			.getAll()
			.then(initialNames => {
				setPersons(initialNames)
			})
	}, [])

	const addName = (event) => {
		event.preventDefault()

		const oldNumber = persons.find(person => person.name === newName)
		if (oldNumber) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const changedNumber = { ...oldNumber, number: newNumber }
				nameService
					.update(oldNumber.id, changedNumber)
					.then(returnedName => {
						setPersons(persons.map(person => person.name !== newName ? person : returnedName))
					})
					.catch(error => {
						alert(`The name '${newName}' was already deleted from server`)
						setPersons(persons.filter(person => person.name !== newName))
					})
			}
		} else {
			const nameObject = { name: newName, number: newNumber }
			nameService
				.create(nameObject)
				.then(returnedName => {
					setPersons(persons.concat(returnedName))
				})
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
			<Persons persons={personsToShow} setPersons={setPersons} />
		</div>
	)
}

export default App