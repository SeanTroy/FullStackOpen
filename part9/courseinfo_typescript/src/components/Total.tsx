import { CoursePart } from "../App";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<h3>
			Number of exercises{" "}
			{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</h3>
	);
};

export default Total;