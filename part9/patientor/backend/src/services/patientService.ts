import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry, NewMedicalEntry, Entry } from '../types';

const patients: Patient[] = patientData;

export const getEntries = (): Patient[] => {
	return patients;
};

export const getSingleEntry = (id: string): Patient | undefined => {
	return patients.find(p => p.id === id);
};

export const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

export const addPatient = (patient: NewPatientEntry): Patient => {
	const newPatient = {
		id: uuid(),
		...patient
	};
	patients.push(newPatient);
	return newPatient;
};

export const addMedicalEntry = (entry: NewMedicalEntry, id: string): Entry | undefined => {
	const patient = patients.find(p => p.id === id);
	if (!patient)
		return undefined;
	const newEntry = {
		id: uuid(),
		...entry
	};
	patient.entries.push(newEntry);
	return newEntry;
};

export default { getEntries, getNonSensitiveEntries };