import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const arrangedByVotes = state.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})
	const dispatch = useDispatch()

	const vote = (id) => {
		// console.log('vote', id)
		dispatch(voteAnecdote(id))
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
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList