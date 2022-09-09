import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(({anecdotes}) => {
		const arrangedByVotes = [...anecdotes].sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})
	const dispatch = useDispatch()

	const vote = (id, content) => {
		// console.log('vote', id)
		dispatch(voteAnecdote(id))
		dispatch(setNotification('You voted for: "' + content + '"'))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList