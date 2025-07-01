export function sanitizeToLettersWithSpaces(input: string): string {
  // Using a regular expression to match consecutive non-letter characters and replace them with a single space
  const lettersWithSpaces = input.replace(
    /[^a-zA-Z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00F1\u00D1]+/g,
    " ",
  );

  // Trim to remove leading and trailing spaces
  return lettersWithSpaces.trim();
}

// // Example usage:
// const inputString = "cri#$ pin@#$";
// const sanitizedString = sanitizeToLettersWithSpaces(inputString);
// console.log(sanitizedString); // Output: "cri pin"
