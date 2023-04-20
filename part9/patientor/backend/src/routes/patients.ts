import express from 'express';
import { getNonSensitiveEntries, addPatient } from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(getNonSensitiveEntries());
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

export default router;