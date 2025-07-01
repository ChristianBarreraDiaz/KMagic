export function formatRut(rut: string): string {
  const cleanRut = rut.replace(/[^0-9kK]/g, "").toUpperCase();

  if (cleanRut.length <= 1) {
    return cleanRut;
  }

  const rutDigits = cleanRut.slice(0, -1);
  const rutVerifier = cleanRut.slice(-1);

  let formattedRut = rutDigits + "-" + rutVerifier;

  return formattedRut;
}
