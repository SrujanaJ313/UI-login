import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
  Stack,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Captcha } from "../../components/captcha";
import { validatePassword } from "../../utils/common";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePassword() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).slice(8)
  );

  const getCaptcha = (captchaValue) => {
    setCaptcha(captchaValue);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    captcha: Yup.string().required("Please enter captcha").matches(captcha),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      captcha: "",
    },
    validationSchema,
    onSubmit: () => {
      toast("Password Changed Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
            mt: 10,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h5" variant="h5" fontWeight="500">
            Reset account password
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={2} mt={2}>
              <TextField
                size="small"
                name="password"
                placeholder="Create Password"
                type="password"
                variant="outlined"
                fullWidth
                label="Create Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
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
                label="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 30 },
                }}
              />

              <Captcha
                formik={formik}
                captcha={captcha}
                getCaptcha={getCaptcha}
              />

              <Button
                type="submit"
                fullWidth
                size="small"
                variant="contained"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  fontSize: "1.2rem",
                  borderRadius: "30px",
                }}
              >
                Reset password
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}