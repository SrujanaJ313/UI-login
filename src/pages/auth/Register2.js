import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Button, Divider, FormControl, FormHelperText, Grid, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate=useNavigate();
    const handleSubmit = (values) => {
        console.log(values);
    };

    const validationSchema = Yup.object().shape({
        userID: Yup.string().required("User ID is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        firstName: Yup.string().required("First Name is required"),
        middleName: Yup.string().required("Middle Initial is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("Invalid email"),
        dateOfBirth: Yup.string().required("Date of Birth is required"),
    });

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 2,
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white"
                }}
            >
                <Typography component="h1" variant="h3" fontWeight="900">
                    NHUIS
                </Typography>
                <Formik
                    initialValues={{
                        userID: "",
                        password: "",
                        confirmPassword: "",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        email: "",
                        dateOfBirth: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                size="small"
                                name="userID"
                                placeholder="User ID"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.userID}
                                error={formik.touched.userID && Boolean(formik.errors.userID)}
                                helperText={formik.touched.userID && formik.errors.userID}
                            />
                            <TextField
                                size="small"
                                name="password"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                size="small"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                error={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                            />
                            <TextField
                                size="small"
                                name="firstName"
                                placeholder="First Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField
                                size="small"
                                name="middleName"
                                placeholder="Middle Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.middleName}
                                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                                helperText={formik.touched.middleName && formik.errors.middleName}
                            />
                            <TextField
                                size="small"
                                name="lastName"
                                placeholder="lastName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                            <TextField
                                size="small"
                                name="email"
                                placeholder="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <FormControl
                                    fullWidth
                                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                    variant="outlined"
                                    margin="normal"
                                >

                                    <DatePicker
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        value={formik.values.dateOfBirth}
                                        placeholder="Date of Birth"
                                        onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                            />
                                        )}
                                    />
                                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                        <FormHelperText>{formik.errors.dateOfBirth}</FormHelperText>
                                    )}
                                </FormControl>
                            </LocalizationProvider>
                            <Button
                                size="small"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: "1.2rem" }}
                            >
                                Register
                            </Button>
                        </form>
                    )}
                </Formik>
                
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={2}
        >
          <Grid item flexItem sx={{ width: "40%" }}>
            <Divider />
          </Grid>
          <Typography component="span" sx={{ fontSize: "1.2rem" }}>
            or
          </Typography>
          <Grid item flexItem sx={{ width: "40%" }}>
            <Divider />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            border: "1px solid #dee2e6",
            color: "#000",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
          size="small"
          onClick={() => navigate("/login")}
        >
        Log In
        </Button>
            </Box>
        </Container>)
}