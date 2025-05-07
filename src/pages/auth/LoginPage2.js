import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, FormGroup } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    localStorage.setItem("user", JSON.stringify({
      userId: "123",
      userName: "Test User",
      email: "testUser@gmail.com"
    }))
    navigate("/msl-reference-list")
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
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
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Field
                as={TextField}
                name="email"
                size="small"
                placeholder="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
                <Field
                    as={TextField}
                    name="email"
                    size="small"
                    placeholder="phone number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Field
                    as={TextField}
                    name="email"
                    size="small"
                    placeholder="userId"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Field
                    as={TextField}
                    name="email"
                    size="small"
                    placeholder="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
              <Button
                type="submit"
                fullWidth
                size="small"
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: "1.2rem" }}
              >
                Log In
              </Button>

            </form>
          )}
        </Formik>
        <Grid item container justifyContent="center" sx={{ m: 2, fontSize: "1rem" }}>
          <Link href="#" onClick={() => navigate("/forgot-password")}>Forgot password?</Link>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={2}
        >
          <Grid item flexItem sx={{ width: "40%" }}><Divider /></Grid>
          <Typography component="span" sx={{ fontSize: "1.2rem" }}>
            or
          </Typography>
          <Grid item flexItem sx={{ width: "40%" }}><Divider /></Grid>
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
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
