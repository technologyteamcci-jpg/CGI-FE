export const passwordValidated = (
  newPassword: string,
  passwordConfirmation: string,
): boolean => {
  let isValid = true;
  isValid = isValid && newPassword == passwordConfirmation;
  isValid = isValid && newPassword.length > 7;
  isValid = isValid && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  return isValid;
};
