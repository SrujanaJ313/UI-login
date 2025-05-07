import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Captcha } from "../../components/captcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPwd() {
  const navigate = useNavigate();
  const location = useLocation();
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).slice(8)
  );
  const [sendEmail, setSendEmail] = useState(false);
  const [timer, setTimer] = useState(60);

  const getCaptcha = (captchaValue) => {
    setCaptcha(captchaValue);
  };


  const handleSubmit = (values) => {
    if (location?.state?.value !== "username?") {
      navigate("/verification", {
        state: {
          email: values.emailOrMobile,
        },
      });
    } else {
      toast("Username sent to email successfully!");
      setSendEmail(!sendEmail);
      const intervalId = setInterval(() => {
        // navigate("/login", {
        //   state: {
        //     email: values.emailOrMobile,
        //   },
        // });
        
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setSendEmail(false);
            setTimer(60);
            clearInterval(intervalId);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

  const errorMessage =
    location?.state?.value !== "username?"
      ? "Email/Mobile Number is required"
      : "Email is required";
  const validationSchema = Yup.object().shape({
    emailOrMobile: Yup.string()
      .required(errorMessage)
      .matches(
        /^(?:[a-zA-Z0-9._-]+@(?:affiliate\.nhes\.nh\.gov))|(?:\d{10})$/,
        "Invalid email/mobile number"
      ),
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
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            fontWeight="900"
            sx={{ m: 2 }}
          >
            NHUIS
          </Typography>
          <Typography component="h1" variant="h5" fontWeight="500">
            Forgot {location?.state?.value}
          </Typography>

          <Formik
            initialValues={{
              emailOrMobile: "",
              captcha: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <form onSubmit={formik.handleSubmit}>
                  <Typography sx={{ fontSize: "18px", color: "grey", mt: 4 }}>
                    Enter the{" "}
                    {location?.state?.value !== "username?"
                      ? "Email address/Mobile Number "
                      : "Email address "}
                    associated with your account.
                  </Typography>
                  <Field
                    as={TextField}
                    size="small"
                    name="emailOrMobile"
                    // placeholder="Enter Email or Mobile Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.emailOrMobile}
                    error={
                      formik.touched.emailOrMobile &&
                      Boolean(formik.errors.emailOrMobile)
                    }
                    helperText={
                      formik.touched.emailOrMobile &&
                      formik.errors.emailOrMobile
                    }
                    label={
                      location?.state?.value !== "username?"
                        ? "Email/Mobile Number"
                        : "Email"
                    }
                    sx={{ width: "100%", mt: 2 }}
                    InputProps={{ sx: { borderRadius: 30 } }}
                  />
                  <Captcha
                    formik={formik}
                    captcha={captcha}
                    getCaptcha={getCaptcha}
                  />
                  <Button
                    type="submit"
                    size="small"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: "30px",
                      textTransform: "none",
                      fontSize: "1.2rem",
                    }}
                    disabled={
                      location?.state?.value === "username?" && sendEmail
                    }
                  >
                    {location?.state?.value !== "username?"
                      ? "Continue"
                      : "Send Email"}
                  </Button>
                  {sendEmail && (
                    <span className="text-sm font-bold">
                      Didn't received username? resend email after 00:
                      {timer.toString().length === 1 ? `0${timer}` : timer} seconds
                    </span>
                   )} 
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
            Return to Log In
          </Button>
        </Box>
      </Container>
      <ToastContainer autoClose={timer * 1000} />
    </>
  );
}
