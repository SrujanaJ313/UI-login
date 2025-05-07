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
import { Formik, ErrorMessage } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import { editMassLayoffValidationSchema } from '../../helpers/Validation';
import moment from 'moment/moment';
export default function EditmassLayOff(props) {
    const { closeModalPopup } = props;
    const handleSubmit = (event) => {

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
                    setFieldValue: "",
                    remarks: ""
                }}
                onSubmit={(values) => {
                    console.log("form valyes", values);
                }}
                validationSchema={editMassLayoffValidationSchema}

            >
                {(formik) => (
                    <>
                        <DialogContent>
                            <Stack width="100%" justifyContent="center" alignItems="center">
                                <Box sx={{ marginTop: 3, width: "100%" }} fullWidth>
                                    <form onSubmit={formik.handleSubmit}>
                                        <FormGroup>
                                            <Grid container alignItems="center">
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084">Employer:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <Typography>Hartford Industries</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid mt={2} container alignItems="center">
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084">UI Account #:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <Typography>000096876</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid mt={2} container alignItems="center">
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084">Unit:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <Typography>000</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid mt={2} container alignItems="center">
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Mass Layoff #:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        name="massLayOff"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.massLayOff}
                                                        error={formik.touched.massLayOff && Boolean(formik.errors.massLayOff)}
                                                        helperText={formik.touched.massLayOff && formik.errors.massLayOff}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2} alignItems="center">
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Mass Layoff Date:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                        <FormControl fullWidth error={formik.touched.massLayOffDate && Boolean(formik.errors.massLayOffDate)}>

                                                            <DatePicker
                                                                name="massLayOffDate"
                                                                label="Mass LayOff Date"
                                                                value={formik.values.massLayOffDate}
                                                                onChange={(value) => formik.setFieldValue('massLayOffDate', value)}
                                                                onBlur={formik.handleBlur && formik.massLayOffDate == null}
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
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Recall Date:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                        <FormControl fullWidth error={formik.touched.recallDate && Boolean(formik.errors.recallDate)}>

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
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084">Deductible Income:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
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
                                            <Grid container mt={2} >
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084"><span className='required'>*</span>Remarks:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <TextField multiline fullWidth
                                                        name="remarks"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.remarks}
                                                        error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                                                        helperText={formik.touched.remarks && formik.errors.remarks}
                                                        inputProps={{
                                                            maxLength: 1500
                                                        }}
                                                        rows={3} />
                                                    <Stack justifyContent="end" alignItems="end"><span>{`${formik.values.remarks.length}/1500`}</span></Stack>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={2} >
                                                <Grid item md={4}>
                                                    <Typography fontWeight="bold" color="#183084">Prior remarks:</Typography>
                                                </Grid>
                                                <Grid item md={8}>
                                                    <TextField multiline fullWidth disabled value={""}
                                                        rows={3} />
                                                </Grid>
                                            </Grid>
                                        </FormGroup>



                                    </form>
                                </Box>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ margin: 2 }}>
                            <Button variant="outlined" onClick={closeModalPopup}>Cancel</Button>
                            <Button variant="contained" type='submit'>OK</Button>
                        </DialogActions></>

                )}
            </Formik>
        </>
    )
}