import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

import TextField from '@mui/material/TextField';


const CustomInputField = styled((props) => (
  <Stack
    spacing={0.75}
    sx={{ width: "100%", ...(props?.stackstyles && props?.stackstyles) }}
  >
    <TextField {...props} />
  </Stack>
))(({ theme, error }) => ({
  "&.MuiInputBase-root": {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    padding: theme.spacing(1.25, 1.5),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: `0.25px solid ${theme.palette.text.secondary}`,
    borderRadius: "4px",
    "& .MuiInputBase-input": {
      padding: 0,
    },
    "& .MuiInputAdornment-root": {
      "& .MuiButtonBase-root": {
        marginRight: theme.spacing(1.5),
      },
    },
  },
  "&.Mui-error": {
    border: `0.25px solid ${theme.palette.error.main}`,
  },
  "&.Mui-focused": {
    border: !error ? `0.25px solid ${theme.palette.primary.main}` : "",
  },
  "&.MuiInputBase-disabled": {
    backgroundColor: "#e9ecef",
    opacity: 0.65,
  },
}));

export default CustomInputField;
