import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

const patients: Patient[] = patientData as Patient[];

export const getEntries = (): Patient[] => {
	return patients;
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