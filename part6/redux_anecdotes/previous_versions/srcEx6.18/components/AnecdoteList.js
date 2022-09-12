import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const filterValue = useSelector(state => state.filter)

	const anecdotes = useSelector(({anecdotes}) => {
		// console.log(anecdotes)
		const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.includes(filterValue))
		const arrangedByVotes = anecdotesToShow.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})

	const vote = (id, content) => {
		// console.log('vote', id)
		dispatch(addVote(id))
		dispatch(setNotification('You voted for: "' + content + '"', 5))
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