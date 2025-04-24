export const validatePasswordInput = (
  password: string,
  confirmPassword: string
) => {
  if (!password || !confirmPassword) {
    return "All fields are required.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  if (password === "mypassword") {
    return "Password must not be the default password.";
  }
  return null;
};
