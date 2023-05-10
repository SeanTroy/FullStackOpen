import { useContext } from 'react'
import { HospitalEntryDetails, OccupationalHealthcareEntryDetails, HealthCheckEntryDetails, assertNever } from './EntryDetailTypes';
import { Entry, Diagnosis } from "../../types"
import { Box } from '@mui/material'

import DiagnosesContext from "../../utils/DiagnosesContext";

const SpecificEntry = ({ entry }: { entry: Entry }) => {
	const diagnoses: Diagnosis[] = useContext(DiagnosesContext)

	switch (entry.type) {
		case 'Hospital':
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />
		case 'HealthCheck':
			return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />
		default:
			return assertNever(entry)
	}
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
	const entryStyle = {
		width: 'max-content',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<Box key={entry.id} style={entryStyle}>
			<SpecificEntry entry={entry} />
		</Box>
	)
}

export default EntryDetails
