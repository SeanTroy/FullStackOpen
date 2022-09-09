import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const add = (event) => {
		event.preventDefault()
		const content = event.target.content.value
		event.target.content.value = ''
		dispatch(createAnecdote(content))
		dispatch(setNotification('You added the note: "' + content + '"'))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

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