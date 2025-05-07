import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/common";
import { toast, ToastContainer } from "react-toastify";
import { Captcha } from "../../components/captcha";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import BadgeIcon from "@mui/icons-material/Badge";

export default function Register() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).slice(8)
  );

  const getCaptcha = (captchaValue) => {
    setCaptcha(captchaValue);
  };
  const handleSubmit = (values) => {
    // console.log(values);
    toast("Registered Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 3 * 1000);
  };

  const validationSchema = Yup.object().shape({
    userID: Yup.string().required("UserID is required"),
    // password: Yup.string().required("Password is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, ["Password must be 8 characters long"])
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    firstName: Yup.string().required("First Name is required"),
    middleInitial: Yup.string().required("Middle Initial is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@affiliate\.nhes\.nh\.gov$/,
        "Invalid email"
      ),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Invalid Mobile Number"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    captcha: Yup.string().required("please enter captcha").matches(captcha),
  });

  return (
    <>
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
            backgroundColor: "white",
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
              middleInitial: "",
              lastName: "",
              email: "",
              mobileNumber: "",
              dateOfBirth: null,
              captcha: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
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
                    error={
                      formik.touched.userID && Boolean(formik.errors.userID)
                    }
                    helperText={formik.touched.userID && formik.errors.userID}
                    label="User ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
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
                    // error={
                    //   formik.touched.password && Boolean(formik.errors.password)
                    // }
                    // helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div>
                      {validatePassword(formik.values.password).map((err) => (
                        <div
                          style={{ fontSize: 12, color: err.errorCode }}
                          key={err.description}
                        >
                          {err.errorCode === "red" ? (
                            <span>&#10008;</span>
                          ) : (
                            <span>&#10004;</span>
                          )}
                          {err.description}
                        </div>
                      ))}
                    </div>
                  )}

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
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    label="Confirm Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
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
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    label="First Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
                  />
                  <TextField
                    size="small"
                    name="middleInitial"
                    placeholder="Middle Intital"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.middleInitial}
                    error={
                      formik.touched.middleInitial &&
                      Boolean(formik.errors.middleInitial)
                    }
                    helperText={
                      formik.touched.middleInitial &&
                      formik.errors.middleInitial
                    }
                    label="Middle Initial"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
                  />
                  <TextField
                    size="small"
                    name="lastName"
                    placeholder="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    label="Last Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
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
                    label="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
                  />
                  <TextField
                    size="small"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.mobileNumber}
                    error={
                      formik.touched.mobileNumber &&
                      Boolean(formik.errors.mobileNumber)
                    }
                    helperText={
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                    }
                    label="Mobile Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SmartphoneIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 },
                    }}
                  />

                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                      }
                      variant="outlined"
                      margin="normal"
                    >
                      <DatePicker
                        name="dateOfBirth"
                        label="Date of Birth"
                        value={formik.values.dateOfBirth}
                        placeholder="Date of Birth"
                        onChange={(value) =>
                          formik.setFieldValue("dateOfBirth", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            size="small"
                          />
                        )}
                      />
                      {formik.touched.dateOfBirth &&
                        formik.errors.dateOfBirth && (
                          <FormHelperText>
                            {formik.errors.dateOfBirth}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </LocalizationProvider>
                  <Captcha
                    formik={formik}
                    captcha={captcha}
                    getCaptcha={getCaptcha}
                  />
                  <Button
                    size="small"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      textTransform: "none",
                      fontSize: "1.2rem",
                      borderRadius: "30px",
                    }}
                  >
                    Register
                  </Button>
                </form>
              );
            }}
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
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1.2rem",
            }}
            size="small"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}
