import express from 'express';
import { getNonSensitiveEntries, getSingleEntry, addPatient, addMedicalEntry } from '../services/patientService';
import { toNewPatientEntry, toNewMedicalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	res.send(getSingleEntry(req.params.id));
});

router.post('/', (req, res) => {
	try {
		const NewPatientEntry = toNewPatientEntry(req.body);
		const addedPatient = addPatient(NewPatientEntry);
		res.json(addedPatient);
	} catch (e) {
		if (e instanceof Error)
			res.status(400).send(e.message);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const NewMedicalEntry = toNewMedicalEntry(req.body);
		const addedEntry = addMedicalEntry(NewMedicalEntry, req.params.id);
		res.json(addedEntry);
	}
	catch (e) {
		if (e instanceof Error)
			res.status(400).send(e.message);
	}
});

export default router;