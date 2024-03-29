export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export interface Discharge {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

export interface sickLeave {
	startDate: string;
	endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: sickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender,
	occupation: string;
	entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

export interface NotificationMessage {
	state: string,
	info: string
}
