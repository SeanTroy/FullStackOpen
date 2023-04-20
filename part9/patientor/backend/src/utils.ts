import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (text: string): text is Gender => {
	return Object.values(Gender).map(g => g.toString()).includes(text);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name");
	}
	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error("Incorrect or missing date of birth");
	}
	return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error("Incorrect or missing SSN");
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender");
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation");
	}
	return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing object");
	}
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newEntry: NewPatientEntry = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation)
		};

		return newEntry;
	}

	throw new Error("Incorrect entry: some fields are missing");
};
