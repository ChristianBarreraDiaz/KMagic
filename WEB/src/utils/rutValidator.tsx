export function validateRut(rut: string): boolean {
  const cleanRut = rut.replace(/[^0-9kK]/g, "").toUpperCase();

  if (cleanRut.length < 2) {
    return false;
  }

  const rutDigits = cleanRut.slice(0, -1);
  const rutVerifier = cleanRut.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits.charAt(i)) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedVerifier = 11 - (sum % 11);
  const verifier = rutVerifier === "K" ? 10 : parseInt(rutVerifier);

  // Check for mathematically correct but legally invalid RUTs
  if (expectedVerifier === 11 && verifier === 0) {
    return false;
  }

  return expectedVerifier === verifier;
}
