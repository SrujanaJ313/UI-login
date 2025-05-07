export const passwordPatterns = {
  length: {
    pattern: /.{8,}/,
    message: "Password must be at least 8 characters long",
  },
  lowercase: {
    pattern: /[a-z]/,
    message: "Password must contain at least one lowercase letter",
  },
  uppercase: {
    pattern: /[A-Z]/,
    message: "Password must contain at least one uppercase letter",
  },
  digit: { pattern: /\d/, message: "Password must contain at least one digit" },
  specialCharacter: {
    pattern: /[!@#$%^&*(),.?":{}|<>]/,
    message: "Password must contain at least one special character",
  },
};
