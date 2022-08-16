import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
	let sum = parts.reduce((total, part) => total + part.exercises, 0);
	return (
		<p>
			<b>total of {sum} exercises</b>
		</p>
	)
}

const Part = ({ part }) =>
	<p>
		{part.name} {part.exercises}
	</p>

const Content = ({ parts }) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course