import { useState, useEffect } from 'react';
import { Diary } from './types';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';
import { getAllDiaries } from './services/diaryService';

const App = () => {

	const [diaries, setDiaries] = useState<Diary[]>([]);

	useEffect(() => {
		getAllDiaries().then(diaries => {
			setDiaries(diaries);
		});
	}, []);

	return (
		<>
			<DiaryForm diaries={diaries} setDiaries={setDiaries}/>
			<DiaryEntries diaries={diaries} />
		</>
	);
}

export default App;
