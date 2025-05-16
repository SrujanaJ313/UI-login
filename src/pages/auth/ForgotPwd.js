import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
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

  const formik = useFormik({
    initialValues: {
      emailOrMobile: "",
      captcha: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (location?.state?.value !== "username?") {
        navigate("/verification", {
          state: {
            email: values.emailOrMobile,
          },
        });
      } else {
        toast("Username sent to email successfully!");
        setSendEmail(true);
        const intervalId = setInterval(() => {
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
    },
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
          <Typography component="h1" variant="h3" fontWeight="900" sx={{ m: 2 }}>
            NHUIS
          </Typography>
          <Typography component="h1" variant="h5" fontWeight="500">
            Forgot {location?.state?.value}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ fontSize: "18px", color: "grey", mt: 4 }}>
              Enter the {location?.state?.value !== "username?" ? "Email address/Mobile Number " : "Email address "} associated with your account.
            </Typography>

            <TextField
              size="small"
              name="emailOrMobile"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.emailOrMobile}
              error={formik.touched.emailOrMobile && Boolean(formik.errors.emailOrMobile)}
              helperText={formik.touched.emailOrMobile && formik.errors.emailOrMobile}
              label={location?.state?.value !== "username?" ? "Email/Mobile Number" : "Email"}
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
              disabled={location?.state?.value === "username?" && sendEmail}
            >
              {location?.state?.value !== "username?" ? "Continue" : "Send Email"}
            </Button>

            {sendEmail && (
              <span className="text-sm font-bold">
                Didn't received username? resend email after 00:
                {timer.toString().length === 1 ? `0${timer}` : timer} seconds
              </span>
            )}
          </form>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} width="100%" sx={{ mt: 2 }}>
            <Divider flexItem sx={{ flex: 1 }} />
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              or
            </Typography>
            <Divider flexItem sx={{ flex: 1 }} />
          </Stack>

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
