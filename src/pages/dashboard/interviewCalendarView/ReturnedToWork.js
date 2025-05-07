import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Select, MenuItem, RadioGroup, FormControlLabel, Radio, InputAdornment, FormHelperText, InputLabel, FormControl, Typography, Button, Stack, Checkbox, FormGroup } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { STATES } from "../../../helpers/Constants";

const schema = yup.object().shape({
  empName: yup.string().required("Company is required. Please enter your company's name."),
  empWorkLocState: yup.string().required("State is required. Please select a state."),
  empWorkLocCity: yup.string().required("City is required. Please enter the city."),
  exactJobTitle: yup.string().required("Job title is required. Please enter your job title."),
  employmentStartDt: yup.date().required("Start date is required. Please select a valid date.")
    .typeError("Start date is required. Please select a valid date."),
  hourlyPayRate: yup.number()
    .required("Hourly pay rate is required. Please enter the hourly pay rate.")
    .max(999.99, "Hourly pay rate must be less than or equal to 999.99.")
    .typeError("Hourly pay rate must be a valid number.")
    .test('is-decimal', 'Hourly pay rate must have at most two decimal places.', (value) =>
      /^\d+(\.\d{1,2})?$/.test(value)
    ),
  partFullTimeInd: yup.string().required("Work schedule is required. Please select a work schedule."),
  workMode: yup.string().required("Work mode is required. Please select a work mode."),
  jms890Ind: yup.string().oneOf(["Y", "N"]),
  jmsCloseGoalsInd: yup.string().oneOf(["Y", "N"]),
  jmsCaseNotesInd: yup.string().oneOf(["Y", "N"]),
  jmsReferralInd: yup.string().oneOf(["Y", "N"]),
  jmsCloseIEPInd: yup.string().oneOf(["Y", "N"]),
  jmsResumeOffInd: yup.string().oneOf(["Y", "N"])
});

function ReturnedToWork({ onCancel }) {
  const states = STATES;

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2}>
            <Controller
              name="empName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Company"
                  size="small"
                  variant="outlined"
                  sx={{ width: '49%'}}
                  error={!!errors.empName}
                  helperText={errors.empName?.message}
                />
              )}
            />            
            <Controller
              name="employmentStartDt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="*Start Date"
                  className="return-to-work-start-date"
                  disablePast
                  sx={{ width: '160px' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      error={!!errors.employmentStartDt}
                      helperText={errors.employmentStartDt?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Controller
              name="empWorkLocCity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*City"
                  size="small"
                  variant="outlined"
                  error={!!errors.empWorkLocCity}
                  helperText={errors.empWorkLocCity?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="empWorkLocState"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl size="small" fullWidth error={!!errors.empWorkLocState}>
                  <InputLabel id="state-dropdown">*State</InputLabel>
                  <Select
                    {...field}
                    label="*State"
                    variant="outlined"
                    labelId="state-dropdown"
                    sx={{ width: '160px' }}
                  >
                    {states.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.id}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.empWorkLocState && <FormHelperText>{errors.empWorkLocState.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Controller
              name="exactJobTitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Job Title"
                  size="small"
                  variant="outlined"
                  sx={{ width: '49%' }}
                  error={!!errors.exactJobTitle}
                  helperText={errors.exactJobTitle?.message}
                />
              )}
            />
            <Controller
              name="hourlyPayRate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Hourly Pay Rate"
                  size="small"
                  variant="outlined"
                  type="number"
                  inputProps={{
                    inputMode: 'decimal',
                    step: '0.01',
                    max: 999.99,
                    pattern: '\\d+\\.?\\d{0,2}'
                  }}
                  sx={{ width: '160px' }}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  error={!!errors.hourlyPayRate}
                  helperText={errors.hourlyPayRate?.message}
                />
              )}
            />
          </Stack>
          <Stack  spacing={2}>
            <Stack spacing={1} flex={1} direction={'row'} alignItems={'center'}>
              <Typography className="label-text">Work Schedule:</Typography>
              <Controller
                name="partFullTimeInd"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="work-schedule-group-label"
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio size="small" sx={{ py: 0 }}/>}
                      label="Full time"
                    />
                    <FormControlLabel
                      value="P"
                      control={<Radio size="small" sx={{ py: 0 }}/>}
                      label="Part time"
                    />
                  </RadioGroup>
                )}
              />
              {errors.partFullTimeInd && <Typography color="error" variant="body2" align="left">{errors.partFullTimeInd.message}</Typography>}
            </Stack>
            <Stack spacing={1} flex={1} direction={'row'} alignItems={'center'}>
              <Typography className="label-text">Work Mode:</Typography>
              <Controller
                name="workMode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="work-mode-group-label"
                  >
                    <FormControlLabel
                      value="onsite"
                      control={<Radio size="small" sx={{ py: 0 }}/>}
                      label="Onsite"
                    />
                    <FormControlLabel
                      value="remote"
                      control={<Radio size="small" sx={{ py: 0 }}/>}
                      label="Remote"
                    />
                    <FormControlLabel
                      value="hybrid"
                      
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                )}
              />
              {errors.workMode && <Typography color="error" variant="body2" align="left">{errors.workMode.message}</Typography>}
            </Stack>
          </Stack>
          <Typography className="label-text" color={'primary'}>Please check off each of the items listed below that you have completed in JMS</Typography>
          <FormGroup>
            <Stack direction="row" spacing={2}>
              <Stack>
                <FormControlLabel
                  control={<Controller
                    name="jms890Ind"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="A non-direct placement recorded in JMS"
                />
                <FormControlLabel
                  control={<Controller
                    name="jmsCloseGoalsInd"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="Goals have been closed in JMS"
                />
                <FormControlLabel
                  control={<Controller
                    name="jmsCaseNotesInd"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="Case notes recorded in JMS"
                />
              </Stack>
              <Stack>
                <FormControlLabel
                  control={<Controller
                    name="jmsReferralInd"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="JMS referral was recorded in JMS"
                />
                <FormControlLabel
                  control={<Controller
                    name="jmsCloseIEPInd"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="IEP has been closed in JMS"
                />
                <FormControlLabel
                  control={<Controller
                    name="jmsResumeOffInd"
                    control={control}
                    defaultValue="N"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value === "Y"}
                        onChange={(e) => field.onChange(e.target.checked ? "Y" : "N")}
                        sx={{ py: 0 }}
                      />
                    )}
                  />}
                  label="Claimant’s resume has been taken offline in JMS"
                />
              </Stack>
            </Stack>
          </FormGroup>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

export default ReturnedToWork;
