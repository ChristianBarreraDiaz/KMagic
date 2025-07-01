export const pascalCaseValidator = (input: string): boolean => {
  const words = input.split(" ");

  for (const word of words) {
    if (!/^[A-Z][a-z]*$/.test(word)) {
      return false;
    }
  }

  return true;
};
