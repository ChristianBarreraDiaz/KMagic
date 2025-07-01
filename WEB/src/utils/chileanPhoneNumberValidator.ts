export const isValidChileanCellNumber = (number: string): boolean => {
  // Check if the number starts with '9' and has a total length of 9 digits
  const chileanCellNumberRegex = /^9\d{8}$/;
  return chileanCellNumberRegex.test(number);
};
