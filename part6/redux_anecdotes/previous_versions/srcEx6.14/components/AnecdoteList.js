import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, setAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes.js'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		anecdoteService
			.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
	}, [dispatch])

	const filterValue = useSelector(state => state.filter)

	const anecdotes = useSelector(({anecdotes}) => {
		const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.includes(filterValue))
		const arrangedByVotes = anecdotesToShow.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})

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