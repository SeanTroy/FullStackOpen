import axios from "axios";
import { useState } from "react";
import Notification from "./Notification";
import { createDiary } from "../services/diaryService";
import { NewDiary, Diary, NotificationMessage } from "../types";

const DiaryForm = ({ diaries, setDiaries }: { diaries: Diary[], setDiaries: React.Dispatch<React.SetStateAction<Diary[]>> }) => {

	const [notification, setNotification] = useState<NotificationMessage | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			date: { value: string };
			weather: { value: string };
			visibility: { value: string };
			comment: { value: string };
		};
		const newDiary: NewDiary = {
			date: target.date.value,
			weather: target.weather.value,
			visibility: target.visibility.value,
			comment: target.comment.value
		};

		createDiary(newDiary)
			.then((data: Diary) => {
				setDiaries(diaries.concat(data));
				setNotification({ state: 'success', info: `Added new entry for ${data.date}` });
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			})
			.catch(error => {
				if (axios.isAxiosError(error))
					setNotification({ state: 'error', info: error.response?.data.replace("Something went wrong.", "") });
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			});
	};

	return (
		<div>
			<h1>Add new entry</h1>
			<Notification message={notification} />
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="date">date</label>
					<input type="date" name="date" />
				</div>
				<div>
					<label htmlFor="weather">weather</label>

					<input type="radio" id="weather1" name="weather" value="sunny" />
					<label htmlFor="weather1">sunny</label>

					<input type="radio" id="weather2" name="weather" value="rainy" />
					<label htmlFor="weather2">rainy</label>

					<input type="radio" id="weather3" name="weather" value="cloudy" />
					<label htmlFor="weather3">cloudy</label>

					<input type="radio" id="weather4" name="weather" value="stormy" />
					<label htmlFor="weather4">stormy</label>

					<input type="radio" id="weather4" name="weather" value="windy" />
					<label htmlFor="weather4">windy</label>
				</div>
				<div>
					<label htmlFor="visibility">visibility</label>

					<input type="radio" id="visibility1" name="visibility" value="great" />
					<label htmlFor="visibility1">great</label>

					<input type="radio" id="visibility2" name="visibility" value="good" />
					<label htmlFor="visibility2">good</label>

					<input type="radio" id="visibility3" name="visibility" value="ok" />
					<label htmlFor="visibility3">ok</label>

					<input type="radio" id="visibility4" name="visibility" value="poor" />
					<label htmlFor="visibility4">poor</label>
				</div>
				<div>
					<label htmlFor="comment">comment</label>
					<input type="text" name="comment" />
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	);
};

export default DiaryForm;