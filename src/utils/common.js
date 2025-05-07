import { passwordPatterns } from "./constants";
export const validatePassword = (password) => {
  const errors = [];
  for (const key in passwordPatterns) {
    if (!passwordPatterns[key].pattern.test(password)) {
      errors.push({
        description: passwordPatterns[key].message,
        errorCode: "red",
      });
    } else {
      errors.push({
        description: passwordPatterns[key].message,
        errorCode: "green",
      });
    }
  }

  return errors;
};
