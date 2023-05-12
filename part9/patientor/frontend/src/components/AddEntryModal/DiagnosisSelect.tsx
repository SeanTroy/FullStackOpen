import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const codes = [
	"M24.2",
	"M51.2",
	"S03.5",
	"J10.1",
	"J06.9",
	"Z57.1",
	"N30.0",
	"H54.7",
	"J03.0",
	"L60.1",
	"Z74.3",
	"L20",
	"F43.2",
	"S62.5",
	"H35.29"
];

const getStyles = (code: string, diagnosisCode: string[], theme: Theme) => {
	return {
		fontWeight:
			diagnosisCode.indexOf(code) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const DiagnosisSelect = ({diagnosisCodes, setDiagnosisCodes}:
	{diagnosisCodes: string[], setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>}) => {

	const theme = useTheme();

	const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const {
			target: { value },
		} = event;
		setDiagnosisCodes(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<div>
			<FormControl sx={{ width: "100%" }}>
				<InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
				<Select
					labelId="diagnosis-codes-label"
					id="diagnosis-codes"
					fullWidth
					multiple
					value={diagnosisCodes}
					onChange={handleChange}
					input={<OutlinedInput label="Code" />}
					MenuProps={MenuProps}
				>
					{codes.map((code) => (
						<MenuItem
							key={code}
							value={code}
							style={getStyles(code, diagnosisCodes, theme)}
						>
							{code}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default DiagnosisSelect;