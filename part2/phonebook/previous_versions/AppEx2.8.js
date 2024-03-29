import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>name: <input value={newName} onChange={handleNameChange} /></div>
				<div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
				<div><button type="submit">add</button></div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person =>
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			)}
		</div>
	)
}

export default App