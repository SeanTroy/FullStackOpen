import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
	const dispatch = useNotificationDispatch()
	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes')
		}
	})

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
		dispatch({ type: 'SET', content: `anecdote '${anecdote.content}' voted` })
		setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
	}

	const result = useQuery('anecdotes', getAnecdotes)

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <div> anecdote service not available due to problems in server </div>
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
