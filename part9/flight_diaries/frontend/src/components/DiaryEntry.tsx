import { Diary } from '../types';

const DiaryEntry = ({ diary }: { diary: Diary }) => {
	return (
		<div>
			<h3>{diary.date}</h3>
			<p>visibility: {diary.visibility}</p>
			<p>weather: {diary.weather}</p>
		</div>
	);
};

export default DiaryEntry;