import { useState } from 'react'

const Button = ({value, onClick}) => <button onClick={onClick}>{value}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	if (all === 0) {
		return (
			<>
				<p>No feedback given</p>
			</>
		)
	}
	return (
		<>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={all} />
			<StatisticLine text="average" value={(good - bad) / all} />
			<StatisticLine text="positive" value={good / all * 100 + " %"} />
		</>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>give feedback</h1>
			<Button value="good" onClick={() => setGood(good + 1)} />
			<Button value="neutral" onClick={() => setNeutral(neutral + 1)} />
			<Button value="bad" onClick={() => setBad(bad + 1)} />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

export default App