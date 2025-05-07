import * as yup from 'yup';

const validationSchema = yup.object().shape({
  employer: yup.string().required('Employer is required'),
  uiAccount: yup.string().required('UI Account is required'),
  unit: yup.string().required('Unit is required'),
  massLayOff: yup.string().required('MassLayOff is required'),
  massLayOffDate: yup.date().required('MassLayOff Date is required'),
  recallDate: yup.date().required('Recall Date is required'),
  // deductibleIncome:yup.string().required("Please select an option")
});

const addNewMSLValidationSchema = yup.object().shape({
  employer: yup.string().required('Employer is required'),
  uiAccount: yup.string().required('UI Account is required'),
  unit: yup.string().required('Unit is required'),
  massLayOff: yup.string().required('Mass Layoff is required'),
  massLayOffDate: yup.date().required('Mass Layoff Date is required'),
  recallDate: yup.date().required('Recall Date is required'),
});

const editMassLayoffValidationSchema = yup.object().shape({
  massLayOff: yup.string().required('Mass Layoff is required'),
  massLayOffDate: yup.date().required('Mass Layoff Date is required'),
  recallDate: yup.date().required('Recall Date is required'),
  remarks: yup.string().required("Unit is required")

})

const cloneMassLayoffValidationSchema = yup.object().shape({
  uiAccount: yup.string().required('UI Account is required'),
  unit: yup.string().required('Unit is required'),
  massLayOff: yup.string().required('MassLayOff is required'),
  massLayOffDate: yup.date().required('MassLayOff Date is required'),
  recallDate: yup.date().required('Recall Date is required'),
});


const addNewClaimantValidationSchema = yup.object().shape({

  enterSSN: yup.string().required("SSN is required"),
  reenterSSN: yup.string().required("SSN is required")
});

export {
  validationSchema, addNewMSLValidationSchema, editMassLayoffValidationSchema,
  cloneMassLayoffValidationSchema, addNewClaimantValidationSchema
};
