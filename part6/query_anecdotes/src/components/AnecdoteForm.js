import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch()
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		},
		onError: () => {
			dispatch({ type: 'SET', content: 'too short anecdote, the length has to be at least 5 characters' })
			setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		newAnecdoteMutation.mutate(content)
		event.target.anecdote.value = ''
		dispatch({ type: 'SET', content: `new anecdote '${content}' created` })
		setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
		console.log('new anecdote')
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
