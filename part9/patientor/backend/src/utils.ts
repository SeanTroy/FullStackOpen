import { NewPatientEntry } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	console.log(object);
	const newEntry: NewPatientEntry = {
		name: "Fake Name",
		dateOfBirth: "Fake Date of Birth",
		ssn: "Fake SSN",
		gender: "female",
		occupation: "Fake Occupation"
	};

	return newEntry;
};
