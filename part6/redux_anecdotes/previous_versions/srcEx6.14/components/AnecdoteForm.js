import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const add = async (event) => {
		event.preventDefault()
		const content = event.target.content.value
		event.target.content.value = ''
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(createAnecdote(newAnecdote))
		dispatch(setNotification('You added the note: "' + content + '"'))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	// const addNote = async (event) => {
	// 	event.preventDefault()
	// 	const content = event.target.note.value
	// 	event.target.note.value = ''
	// 	const newNote = await anecdoteService.createNew(content)
	// 	dispatch(createNote(newNote))
	// }

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={add}>
				<div><input name="content" /></div>
				<button>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm