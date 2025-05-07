import { Button, CardActions, TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./style.css";
import { Field } from "formik";

export const Captcha = ({ formik, captcha, getCaptcha }) => {
  const refreshString = () => {
    const captchaValue = Math.random().toString(36).slice(8);
    getCaptcha(captchaValue);
  };

  return (
    <>
      <CardActions>
        <div className="h3">{captcha}</div>
        <Button
          startIcon={<RefreshIcon />}
          onClick={() => refreshString()}
        ></Button>
      </CardActions>
      
      <Field
        as={TextField}
        name="captcha"
        size="small"
        placeholder="Captcha"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        value={formik.values.captcha}
        error={formik.touched.captcha && Boolean(formik.errors.captcha)}
        helperText={formik.touched.captcha && formik.errors.captcha && "Invalid Captcha"}
        label="Enter Captcha"
        InputLabelProps={{ shrink: true }}
        InputProps={{ sx: { borderRadius: 30 } }}
      />
    </>
  );
};
