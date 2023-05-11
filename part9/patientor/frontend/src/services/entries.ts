import axios from "axios";
import { EntryFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (id: string, object: EntryFormValues) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	);

	return data;
};

export default {
	create
};
