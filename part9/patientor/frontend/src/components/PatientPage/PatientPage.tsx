import { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useParams } from 'react-router-dom';

import { Patient } from "../../types";

import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {

	const [patient, setPatient] = useState<Patient | null>(null);
	const params = useParams();

	useEffect(() => {
		const getPatient = async () => {
			if (params.id) {
				const patient = await patientService.getSingleEntry(params.id);
				setPatient(patient);
			}
		};
		void getPatient();
	}, [params.id]);

	return (
		<div className="App">
			<Box>
				<Typography align="left" variant="h5" marginTop={'20px'}>
					{patient?.name}
					{patient?.gender === 'male' && <MaleIcon />}
					{patient?.gender === 'female' && <FemaleIcon />}
					{patient?.gender === 'other' && <TransgenderIcon />}
				</Typography>
				<Typography align="left" variant="body1">
					ssn: {patient?.ssn}
				</Typography>
				<Typography align="left" variant="body1">
					occupation: {patient?.occupation}
				</Typography>
			</Box>
			<Box>
				{patient?.entries.length !== 0 &&
					<Typography align="left" variant="h6" marginTop={'20px'}>
						entries
					</Typography>
				}
				{patient?.entries.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} />
				))}
			</Box>
		</div>
	);
};

export default PatientPage;
