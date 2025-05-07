import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Formik, ErrorMessage } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { validationSchema } from "../../helpers/Validation";
import moment from "moment";
import client from '../../helpers/Api';
import ProgressBar from "../../components/ProgressBar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function UploadmassLayOff(props) {
    const { closeModalPopup } = props;
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [filename, setFilename] = React.useState("");
    const [file, setFile] = React.useState();
    const [progress, setProgress] = React.useState(10);
    const [showProgress, setShowProgress] = React.useState(false);

    // React.useEffect(() => {
    //     if (showProgress) {
    //         const timer = setInterval(() => {
    //             setProgress(prevProgress => {
    //                 if (prevProgress === 100) {
    //                     console.log(prevProgress)

    //                     return 100;
    //                 } else {
    //                     return prevProgress + 10;
    //                 }
    //             });
    //         }, 800);
    //         return () => {
    //             clearInterval(timer);
    //         };
    //     }

    // }, [showProgress]);

    // React.useEffect(() => {
    //     if (progress === 100) {
    //         closeModalPopup();
    //         toast.success('File uploaded successfully!');
    //     }
    // }, [progress])

    const onUploadProgress = (event) => {
        const prog = Math.round((100 * event.loaded) / event.total);
        setProgress(prog)
    }


    const handleSubmit = async (values) => {
        if (isSubmitted) {
            let formData = new FormData();
            try {
                formData.append("file", file);
                setShowProgress(true)
                const res = await client.post("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress,
                });
                if (res) {
                    closeModalPopup();
                    toast.success('File uploaded successfully!');
                    setShowProgress(false)
                }

            } catch (ex) {
                setShowProgress(false)

                toast.error('Unable to upload file, please try again!!');
            }

            // setShowProgress(true)

            // closeModalPopup()
        } else {
            try {
                const response = await client.post(
                    `./mockData/references.json`, {}

                );
                setIsSubmitted(true)
            } catch (error) {
                // setLoading(false);
                console.log(error)
                setIsSubmitted(true)

            }
            console.log(values)
        }

    };


    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setFile(file)
        setFilename(name);
    };

    const onFileSubmit = () => {

    }
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }
    return (
        <>:
            <Formik
                initialValues={{
                    employer: "",
                    uiAccount: "",
                    unit: "",
                    massLayOff: "",
                    massLayOffDate: null,
                    recallDate: null,
                    deductibleIncome: "",
                    setFieldValue: "",

                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <DialogContent>
                        <Stack width="100%" justifyContent="center" alignItems="center">
                            <Box sx={{ marginTop: 1, width: "100%" }} fullWidth>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormGroup>
                                        <Grid container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span>Employer:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    name="employer"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.employer}
                                                    error={formik.touched.employer && Boolean(formik.errors.employer)}
                                                    helperText={formik.touched.employer && formik.errors.employer}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span> UI Account #:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    disabled={isSubmitted}
                                                    size="small"
                                                    fullWidth
                                                    name="uiAccount"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.uiAccount}
                                                    error={formik.touched.uiAccount && Boolean(formik.errors.uiAccount)}
                                                    helperText={formik.touched.uiAccount && formik.errors.uiAccount}
                                                    onKeyPress={handleKeyPress}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span> Unit:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    disabled={isSubmitted}
                                                    size="small"
                                                    fullWidth
                                                    name="unit"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.unit}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    onKeyPress={handleKeyPress}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid mt={2} container alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span>Mass Layoff #:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <TextField
                                                    disabled={isSubmitted}
                                                    size="small"
                                                    fullWidth
                                                    name="massLayOff"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.massLayOff}
                                                    error={formik.touched.massLayOff && Boolean(formik.errors.massLayOff)}
                                                    helperText={formik.touched.massLayOff && formik.errors.massLayOff}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={5}>
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span>Mass Layoff Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>

                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <FormControl fullWidth error={formik.touched.massLayOffDate && Boolean(formik.errors.massLayOffDate)}>
                                                        <DatePicker
                                                            disabled={isSubmitted}
                                                            name="massLayOffDate"
                                                            label="Mass LayOff Date"
                                                            value={formik.values.massLayOffDate}
                                                            onChange={(value) => formik.setFieldValue('massLayOffDate', value)}
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        // onBlur={formik.handleBlur && formik.massLayOff == null}
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
                                                <Typography fontWeight="bold" color="#183084">
                                                    <span className="required">*</span>Recall Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <FormControl fullWidth error={formik.touched.recallDate && Boolean(formik.errors.recallDate)}>
                                                        <DatePicker
                                                            disabled={isSubmitted}
                                                            name="recallDate"
                                                            label="Recall Date"
                                                            value={formik.values.recallDate}
                                                            onChange={(value) => formik.setFieldValue('recallDate', value)}
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        // onBlur={formik.handleBlur}
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
                                                        disabled={isSubmitted}
                                                    >
                                                        <Stack direction="row" spacing={2}>
                                                            <FormControlLabel
                                                                value="yes"
                                                                control={<Radio />}
                                                                label="Yes"
                                                                disabled={isSubmitted}
                                                            />
                                                            <FormControlLabel
                                                                value="no"
                                                                control={<Radio />}
                                                                label="No"
                                                                disabled={isSubmitted}
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

                                    {
                                        isSubmitted && <>
                                            <Stack direction="row" alignItems="center">
                                                <Button
                                                    component="label"
                                                    variant="outlined"
                                                    startIcon={<UploadFileIcon />}
                                                    sx={{ marginRight: "1rem" }}
                                                >
                                                    Choose File
                                                    <input type="file" hidden onChange={handleFileUpload}
                                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                                </Button>
                                                <Box>{filename}</Box>
                                            </Stack>
                                        </>
                                    }
                                    {
                                        showProgress && <Box sx={{ width: '100%', marginTop: 2 }}>
                                            <ProgressBar value={progress} />
                                        </Box>
                                    }
                                    <DialogActions sx={{ margin: 2 }}>
                                        <Button variant="outlined" onClick={closeModalPopup}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" type="submit" disabled={isSubmitted && !(isSubmitted && filename)}>
                                            {isSubmitted ? "Submit" : "OK"}
                                        </Button>
                                    </DialogActions>


                                </form>

                            </Box>
                        </Stack>

                    </DialogContent>
                )}
            </Formik>

        </>
    );
}
