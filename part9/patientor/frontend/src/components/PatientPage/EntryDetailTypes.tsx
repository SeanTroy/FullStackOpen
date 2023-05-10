import {
	Diagnosis,
	HealthCheckEntry,
	HospitalEntry,
	OccupationalHealthcareEntry
} from "../../types"
import { Typography } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const HealthLevelIcons = [
	<FavoriteIcon key="0" sx={{ color: "green" }} />,
	<FavoriteIcon key="1" sx={{ color: "yellow" }} />,
	<FavoriteIcon key="2" sx={{ color: "orange" }} />,
	<HeartBrokenIcon key="3" sx={{ color: "red" }} />
];

export const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
	return (
		<>
			<Typography align="left" variant="body2"> {entry.date}
				<LocalHospitalIcon />
			</Typography>
			<Typography align="left" variant="body2"> {entry.description} </Typography>
			<ul>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
					</li>
				))}
			</ul>
			<Typography align="left" variant="body2"> discharged: {entry.discharge.date}, reason: {entry.discharge.criteria} </Typography>
			<Typography align="left" variant="body2"> diagnose by {entry.specialist} </Typography>
		</>
	)
}

export const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
	return (
		<>
			<Typography align="left" variant="body2"> {entry.date}
				<WorkIcon />
			</Typography>
			<Typography align="left" variant="body2"> Employer: {entry.employerName} </Typography>
			<Typography align="left" variant="body2"> {entry.description} </Typography>
			<ul>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
					</li>
				))}
			</ul>
			{entry.sickLeave &&
				<Typography align="left" variant="body2">
					sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
				</Typography>}
			<Typography align="left" variant="body2"> diagnose by {entry.specialist} </Typography>
		</>
	)
}

export const HealthCheckEntryDetails = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
	return (
		<>
			<Typography align="left" variant="body2"> {entry.date}
				<FavoriteIcon />
			</Typography>
			<Typography align="left" variant="body2"> {entry.description} </Typography>
			<Typography align="left" variant="body2"> Health check rating: {HealthLevelIcons[entry.healthCheckRating]} </Typography>
			<ul>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
					</li>
				))}
			</ul>
			<Typography align="left" variant="body2"> diagnose by {entry.specialist} </Typography>
		</>
	)
}

export const assertNever = (value: never): never => {
	throw new Error(
		'Impossible Entry Value', value
	)
}
