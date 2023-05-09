import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

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

export default { getEntries, getNonSensitiveEntries };