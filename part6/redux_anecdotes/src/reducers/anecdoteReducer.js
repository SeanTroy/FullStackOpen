import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		voteAnecdote(state, action) {
			const id = action.payload.id
			return state.map(anecdote =>
				anecdote.id !== id ? anecdote : action.payload
			)
		},
		setAnecdotes(state, action) {
			return action.payload
		  }
	},
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const addVote = id => {
	return async dispatch => {
		const anecdoteToVote = await anecdoteService.addVote(id)
		dispatch(voteAnecdote(anecdoteToVote))
	}
}

export default anecdoteSlice.reducer