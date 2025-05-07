import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import theme from "../../theme/theme";
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Formik, useFormik, ErrorMessage } from "formik";
import { cloneMassLayoffValidationSchema } from '../../helpers/Validation';
import { string, required } from "yup";
import { FormControl, FormHelperText } from "@mui/material";
import moment from 'moment';
export default function ClonemassLayOff(props) {
    const { closeModalPopup } = props;
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);


    const handleSubmit = (event) => { };
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    uiAccount: "",
                    unit: "",
                    massLayOff: "",
                    massLayOffDate: null,
                    recallDate: null,
                    deductibleIncome: "",
                }}
                onSubmit={(values) => {
                    console.log("form valyes", values);
                }}
                validationSchema={cloneMassLayoffValidationSchema}
            >
                {(formik) => (
                    <DialogContent>
                        <Stack width="100%" justifyContent="center" alignItems="center">


                            <Box sx={{ marginTop: 3, width: "100%" }} fullWidth>
                                <form onSubmit={formik.handleSubmit}>

                                    <FormGroup>
                                        <Grid container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">Employer:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <Typography>Hartford Industries</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">UI Account #:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <Typography>000096876</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Unit:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    name="unit"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.unit}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Mass Layoff #:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    name="massLayOff"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.massLayOff}
                                                    error={formik.touched.massLayOff && Boolean(formik.errors.massLayOff)}
                                                    helperText={formik.touched.massLayOff && formik.errors.massLayOff}
                                                />                                    </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Mass Layoff Date:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <FormControl error={formik.touched.massLayOffDate && Boolean(formik.errors.massLayOffDate)} fullWidth>
                                                        <DatePicker
                                                            name="massLayOffDate"
                                                            label="Mass LayOff Date"
                                                            value={formik.values.massLayOffDate}
                                                            onChange={(value) => formik.setFieldValue('massLayOffDate', value)}
                                                            onBlur={formik.handleBlur && formik.massLayOff == null}
                                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        />
                                                        {formik.touched.massLayOffDate && formik.errors.massLayOffDate && (
                                                            <FormHelperText>{formik.errors.massLayOffDate}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Recall Date:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <FormControl error={formik.touched.recallDate && Boolean(formik.errors.recallDate)} fullWidth>

                                                        <DatePicker
                                                            name="recallDate"
                                                            label="Recall Date"
                                                            value={formik.values.recallDate}
                                                            onChange={(value) => formik.setFieldValue('recallDate', value)}
                                                            onBlur={formik.handleBlur}
                                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}

                                                        />
                                                        {formik.touched.recallDate && formik.errors.recallDate && (
                                                            <FormHelperText>{formik.errors.recallDate}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">Deductible Income:</Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <FormControl component="fieldset" error={formik.touched.deductibleIncome && Boolean(formik.errors.deductibleIncome)}>
                                                    <RadioGroup
                                                        aria-labelledby="demo-error-radios"
                                                        name="searchBy"
                                                        value={formik.values.deductibleIncome}
                                                        onChange={(event) => {
                                                            const selectedValue = event.target.value;
                                                            formik.setFieldValue('deductibleIncome', selectedValue);
                                                        }}
                                                    >
                                                        <Stack direction="row" spacing={2}>
                                                            <FormControlLabel
                                                                value="yes"
                                                                control={<Radio />}
                                                                label="Yes"

                                                            />
                                                            <FormControlLabel
                                                                value="no"
                                                                control={<Radio />}
                                                                label="No"

                                                            />
                                                        </Stack>
                                                    </RadioGroup>
                                                    {formik.touched.deductibleIncome && formik.errors.deductibleIncome && (
                                                        <FormHelperText>{formik.errors.deductibleIncome}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                    <DialogActions sx={{ margin: 2 }}>
                                        <Button variant="outlined" onClick={closeModalPopup}>Cancel</Button>
                                        <Button variant="contained" type='submit'>OK</Button>
                                    </DialogActions>
                                </form>
                            </Box>
                        </Stack>
                    </DialogContent>)}
            </Formik>
        </>
    )
}