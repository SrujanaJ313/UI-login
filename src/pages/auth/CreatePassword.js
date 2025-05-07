import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Captcha } from "../../components/captcha";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
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

  const handleSubmit = () => {
    toast("Password Changed Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 3 * 1000);
  };

  const validationSchema = Yup.object().shape({
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
          <Typography component="h5" variant="h5" fontWeight="500">
            Reset account password
          </Typography>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
              captcha: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <form onSubmit={formik.handleSubmit}>
                  <Field
                    as={TextField}
                    size="small"
                    name="password"
                    placeholder="Create Password"
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
                    label="Create Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      sx:{ borderRadius: 30}
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

                  <Field
                    as={TextField}
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
                      sx:{ borderRadius: 30}
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
                      mt: 3,
                      mb: 2,
                      textTransform: "none",
                      fontSize: "1.2rem",
                      borderRadius: "30px",
                    }}
                  >
                    Reset password
                  </Button>
                </form>
              );
            }}
          </Formik>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}
