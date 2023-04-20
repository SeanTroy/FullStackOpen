import patientData from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

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

export default { getEntries, getNonSensitiveEntries };