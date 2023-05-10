import {
	NewPatientEntry,
	NewMedicalEntry,
	Gender,
	Diagnosis,
	HealthCheckRating,
	Discharge,
	Entry,
	TypeSpecificValues,
	SickLeave
} from "./types";

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
			occupation: parseOccupation(object.occupation),
			entries: []
		};

		return newEntry;
	}

	throw new Error("Incorrect entry: some fields are missing");
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error("Incorrect or missing type");
	}
	return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		return [] as Array<Diagnosis['code']>;
	}
	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || typeof discharge !== 'object' ||
		!('date' in discharge) || !('criteria' in discharge) ||
		!isString(discharge.date) || !isString(discharge.criteria)) {
		throw new Error("Incorrect or missing discharge");
	}
	return discharge as Discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!sickLeave || typeof sickLeave !== 'object' ||
		!('startDate' in sickLeave) || !('endDate' in sickLeave) ||
		!isString(sickLeave.startDate) || !isString(sickLeave.endDate) ||
		!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
		throw new Error("Incorrect or missing sick leave");
	}
	return sickLeave as SickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (!rating || typeof rating !== 'number' || !(rating in HealthCheckRating)) {
		throw new Error("Incorrect or missing healthCheckRating");
	}
	return rating;
};

const parseTypeProperties = (object: Entry): TypeSpecificValues => {
	switch (object.type) {
		case "Hospital":
			return ({
					type: "Hospital",
					discharge: parseDischarge(object.discharge)
				});
		case "OccupationalHealthcare":
			return ({
					type: "OccupationalHealthcare",
					employerName: parseName(object.employerName),
					sickLeave: parseSickLeave(object.sickLeave)
				});
		case "HealthCheck":
			return ({
					type: "HealthCheck",
					healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
				});
		default:
			throw new Error("Incorrect or missing type");
	}
};

export const toNewMedicalEntry = (object: unknown): NewMedicalEntry => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing object");
	}
	if ('date' in object && 'specialist' in object && 'type' in object && 'description' in object) {
		const newEntry: NewMedicalEntry = {
			date: parseDateOfBirth(object.date),
			specialist: parseName(object.specialist),
			description: parseDescription(object.description),
			...parseTypeProperties(object as Entry)
		};

		if ('diagnosisCodes' in object) {
			newEntry.diagnosisCodes = parseDiagnosisCodes(object);
		}

		return newEntry;
	}
	throw new Error("Incorrect or missing fields in medical entry");
};