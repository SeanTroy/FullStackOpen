import { Diary } from '../types';
import DiaryEntry from './DiaryEntry';

const DiaryEntries = ({ diaries }: { diaries: Diary[] }) => {
	return (
		<div>
			<h1>Diary Entries</h1>
			{diaries.map((diary) => (
				<DiaryEntry key={diary.id} diary={diary} />
			))}
		</div>
	);
};

export default DiaryEntries;