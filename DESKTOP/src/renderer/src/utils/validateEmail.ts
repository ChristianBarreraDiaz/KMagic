// emailValidator.ts

export const validateEmail = (email: string): boolean => {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Test the email against the regular expression
  return emailRegex.test(email)
}
