import { Diary } from '../types';

const DiaryEntry = ({ diary }: { diary: Diary }) => {
	return (
		<div>
			<h3>{diary.date}</h3>
			<p>weather: {diary.weather}</p>
			<p>visibility: {diary.visibility}</p>
			<p>comment: {diary.comment}</p>
		</div>
	);
};

export default DiaryEntry;