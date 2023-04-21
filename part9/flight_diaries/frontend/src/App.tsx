import { useState, useEffect } from 'react';
import { Diary } from './types';
import DiaryEntries from './components/DiaryEntries';
import { getAllDiaries } from './services/diaryService';

const App = () => {

	const [diaries, setDiaries] = useState<Diary[]>([]);
	// const [newDiary, setNewDiary] = useState<Diary | undefined>(undefined);

	useEffect(() => {
		getAllDiaries().then(diaries => {
			setDiaries(diaries);
		});
	}, []);

	return (
		<DiaryEntries diaries={diaries} />
	);
}

export default App;
