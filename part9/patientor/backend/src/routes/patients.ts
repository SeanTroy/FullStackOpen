import express from 'express';
import { getNonSensitiveEntries, addPatient } from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(getNonSensitiveEntries());
});

router.post('/', (req, res) => {
	const NewPatientEntry = toNewPatientEntry(req.body);
	const addedPatient = addPatient(NewPatientEntry);
	res.json(addedPatient);
});

export default router;