import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient, Diagnosis } from "./types";

import DiagnosesContext from "./utils/DiagnosesContext";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();
		const fetchDiagnoses = async () => {
			const diagnoses = await patientService.getDiagnoses();
			setDiagnoses(diagnoses);
		};
		void fetchDiagnoses();
	}, []);

	return (
		<DiagnosesContext.Provider value={diagnoses}>
			<div className="App">
				<Router>
					<Container>
						<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
							Patientor
						</Typography>
						<Button component={Link} to="/" variant="contained" color="primary">
							Home
						</Button>
						<Divider hidden />
						<Routes>
							<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
							<Route path="/patients/:id" element={<PatientPage />} />
						</Routes>
					</Container>
				</Router>
			</div>
		</DiagnosesContext.Provider>
	);
};

export default App;
