import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Input } from "@mui/material";
import entryService from "../../services/entries";
import { EntryFormValues, Patient } from "../../types";
import Notification from "../Notification";
import { NotificationMessage } from "../../types";
import DiagnosisSelect from "./DiagnosisSelect";

const AddEntryForm = ({ patient, setPatient }:
	{ patient: Patient, setPatient: React.Dispatch<React.SetStateAction<Patient | null>> }
) => {
	const [type, setType] = useState("HealthCheck");
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [healthCheckRating, setHealthCheckRating] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

	const typeOptions = ["HealthCheck", "Hospital", "OccupationalHealthcare"];

	const [notification, setNotification] = useState<NotificationMessage | null>(null);

	const clearOptions = () => {
		setDate('');
		setDescription('');
		setSpecialist('');
		setDiagnosisCodes([]);
		setHealthCheckRating('');
		setDischargeDate('');
		setDischargeCriteria('');
		setEmployerName('');
		setSickLeaveStartDate('');
		setSickLeaveEndDate('');
	};

	const onTypeChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		setType(event.target.value);
		clearOptions();
	};

	const submitMedicalEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		const values: EntryFormValues = type === "HealthCheck" ?
			{
				type: "HealthCheck",
				date,
				description,
				specialist,
				diagnosisCodes: diagnosisCodes,
				healthCheckRating: Number(healthCheckRating)
			} : type === "Hospital" ?
				{
					type: "Hospital",
					date,
					description,
					specialist,
					diagnosisCodes: diagnosisCodes,
					discharge: {
						date: dischargeDate,
						criteria: dischargeCriteria
					}
				} :
				{
					type: "OccupationalHealthcare",
					date,
					description,
					specialist,
					diagnosisCodes: diagnosisCodes,
					employerName,
					sickLeave: {
						startDate: sickLeaveStartDate,
						endDate: sickLeaveEndDate
					}
				};
		try {
			const entry = await entryService.create(patient.id, values);
			setPatient({ ...patient, entries: patient.entries.concat(entry) });
			clearOptions();
			console.log(entry)
		} catch (e) {
			if (axios.isAxiosError(e))
				setNotification({ state: 'error', info: e.response?.data });
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	return (
		<div>
			<Notification message={notification} />
			<form onSubmit={submitMedicalEntry}>
				<InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
				<Select
					label="Type"
					fullWidth
					value={type}
					onChange={onTypeChange}
					style={{ marginBottom: 20 }}
				>
					{typeOptions.map((option, index) =>
						<MenuItem
							key={index}
							value={option}
						>
							{option
							}</MenuItem>
					)}
				</Select>
				<InputLabel>Date</InputLabel>
				<Input
					type="date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)} />
				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<DiagnosisSelect diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes}/>
				{/* <TextField
					label="Diagnosis Codes"
					placeholder="Separate codes with spaces, i.e. M24.2 M51.2 ..."
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/> */}
				{type === "HealthCheck" &&
					<TextField
						label="Health Check Rating"
						fullWidth
						value={healthCheckRating}
						onChange={({ target }) => setHealthCheckRating(target.value)}
					/>
				}
				{type === "Hospital" &&
					<>
						<InputLabel>Discharge Date</InputLabel>
						<Input
							type="date"
							fullWidth
							value={dischargeDate}
							onChange={({ target }) => setDischargeDate(target.value)} />
						<TextField
							label="Discharge Criteria"
							fullWidth
							value={dischargeCriteria}
							onChange={({ target }) => setDischargeCriteria(target.value)}
						/>
					</>
				}
				{type === "OccupationalHealthcare" &&
					<>
						<TextField
							label="Employer Name"
							fullWidth
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
						/>
						<InputLabel>Sick Leave Start Date</InputLabel>
						<Input
							type="date"
							fullWidth
							value={sickLeaveStartDate}
							onChange={({ target }) => setSickLeaveStartDate(target.value)} />
						<InputLabel>Sick Leave End Date</InputLabel>
						<Input
							type="date"
							fullWidth
							value={sickLeaveEndDate}
							onChange={({ target }) => setSickLeaveEndDate(target.value)} />
					</>
				}
				<Grid>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: "left", marginTop: 10, marginBottom: 10 }}
							type="button"
							onClick={clearOptions}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "right", marginTop: 10, marginBottom: 10
							}}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddEntryForm;