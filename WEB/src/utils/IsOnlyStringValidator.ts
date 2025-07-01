export function isOnlyString(input: any): boolean {
  // Check if the input is truthy and its type is 'string'
  if (input && typeof input === "string") {
    // Allow alphabetical characters, one space between words, and Spanish characters with accents
    return /^[a-zA-Z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00F1\u00D1]+( [a-zA-Z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00F1\u00D1]+)*$/.test(
      input,
    );
  }
  return false;
}
