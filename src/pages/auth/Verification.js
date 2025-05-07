import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OTPicon from "../../../src/assets/images/otp-icon.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialOtpValues = {
    otpValue1: "",
    otpValue2: "",
    otpValue3: "",
    otpValue4: "",
  };
  const [{ otpValue1, otpValue2, otpValue3, otpValue4 }, setOtpValue] =
    useState(initialOtpValues);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    const otpValue = `${otpValue1}${otpValue2}${otpValue3}${otpValue4}`;
    if (!isValidOtp(otpValue)) {
      setError("Invalid OTP");
      return;
    }
    toast("Verified Successfully!");
    setTimeout(() => {
      navigate("/reset-password");
    }, 2 * 1000);
  };

  const isValidOtp = (value) => {
    return /^[0-9]{4}$/.test(value);
  };

  const onChangeHandler = (event) => {
    setOtpValue((prevOtpValue) => ({
      ...prevOtpValue,
      [event.target.name]: event.target.value,
    }));
  };

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
            backgroundColor: "white",
          }}
        >
          <Typography component="h1" variant="h3" fontWeight="900">
            NHUIS
          </Typography>
          <Typography style={{ margin: "20px", fontSize: "1.6rem" }}>
            Two-Step Verification
          </Typography>
          <img src={OTPicon} alt="" />
          <Typography
            textAlign="center"
            fontSize="1.4rem"
            style={{ marginTop: "20px" }}
          >
            Enter the verification code we sent to<br></br>
            <span style={{ fontWeight: "bold" }}>{location?.state?.email}</span>
          </Typography>
          <form>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <TextField
                name="otpValue1"
                size="small"
                variant="outlined"
                value={otpValue1}
                onChange={onChangeHandler}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />

              <TextField
                name="otpValue2"
                size="small"
                variant="outlined"
                value={otpValue2}
                onChange={onChangeHandler}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />

              <TextField
                name="otpValue3"
                size="small"
                variant="outlined"
                value={otpValue3}
                onChange={onChangeHandler}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />

              <TextField
                name="otpValue4"
                size="small"
                variant="outlined"
                value={otpValue4}
                onChange={onChangeHandler}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
            </Box>
            {error && <p style={{ fontSize: 15, color: "red" }}>{error}</p>}

            <Button
              size="small"
              // type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "1.2rem",
              }}
              onClick={handleSubmit}
            >
              Verify
            </Button>
          </form>

          <Grid
            item
            container
            justifyContent="center"
            sx={{ m: 2, fontSize: "1rem" }}
          >
            Didn't get the code?
            <Link
              onClick={() => {
                navigate("/verification");
                setError("");
                setOtpValue(initialOtpValues);
              }}
              underline="hover"
              style={{ fontWeight:'bold'}}
            >
              Resend it
            </Link>
          </Grid>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}
