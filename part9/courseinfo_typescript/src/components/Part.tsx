import { CoursePart } from '../types'

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case 'basic':
			return (
				<div key={part.name}>
					<h3>{part.name} {part.exerciseCount}</h3>
					<i>{part.description}</i>
				</div>
			);
		case 'group':
			return (
				<div key={part.name}>
					<h3>{part.name} {part.exerciseCount}</h3>
					project exercises {part.groupProjectCount}
				</div>
			);
		case 'background':
			return (
				<div key={part.name}>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p><i>{part.description}</i></p>
					{part.backgroundMaterial}
				</div>
			);
		case 'special':
			return (
				<div key={part.name}>
					<h3>{part.name} {part.exerciseCount}</h3>
					<p><i>{part.description}</i></p>
					required skills: {part.requirements.map((req, i) => ((i ? ', ' : '') + req))}
				</div>
			);
		default:
			return assertNever(part);
	}
}

export default Part