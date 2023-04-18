import axios from 'axios'

export const getAnecdotes = () => {
	const request = axios.get('http://localhost:3001/anecdotes')
	return request.then(response => response.data)
}

export const createAnecdote = (content) => {
	const request = axios.post('http://localhost:3001/anecdotes', { content, votes: 0 })
	return request.then(response => response.data)
}

export const updateAnecdote = (updatedAnecdote) => {
	const request = axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote)
	return request.then(response => response.data)
}
