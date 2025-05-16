import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Stack,
  Link,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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

  const isValidOtp = (value) => /^[0-9]{4}$/.test(value);

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
          <Typography sx={{ mt: 2, fontSize: "1.6rem" }}>
            Two-Step Verification
          </Typography>
          <img src={OTPicon} alt="OTP Icon" />
          <Typography
            textAlign="center"
            fontSize="1.4rem"
            sx={{ mt: 2 }}
          >
            Enter the verification code we sent to<br />
            <span style={{ fontWeight: "bold" }}>{location?.state?.email}</span>
          </Typography>

          <form>
            <Stack direction="row" spacing={1} mt={2} justifyContent="center">
              <TextField
                name="otpValue1"
                size="small"
                variant="outlined"
                value={otpValue1}
                onChange={onChangeHandler}
                fullWidth
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                name="otpValue2"
                size="small"
                variant="outlined"
                value={otpValue2}
                onChange={onChangeHandler}
                fullWidth
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                name="otpValue3"
                size="small"
                variant="outlined"
                value={otpValue3}
                onChange={onChangeHandler}
                fullWidth
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                name="otpValue4"
                size="small"
                variant="outlined"
                value={otpValue4}
                onChange={onChangeHandler}
                fullWidth
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
            </Stack>

            {error && (
              <Typography color="error" fontSize="0.9rem" mt={1}>
                {error}
              </Typography>
            )}

            <Button
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
              onClick={handleSubmit}
            >
              Verify
            </Button>
          </form>

          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2, fontSize: "1rem" }}>
            <Typography>Didn't get the code?</Typography>
            <Link
              component="button"
              onClick={() => {
                navigate("/verification");
                setError("");
                setOtpValue(initialOtpValues);
              }}
              underline="hover"
              fontWeight="bold"
              sx={{ fontSize: "1rem" }}
            >
              Resend it
            </Link>
          </Stack>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}
