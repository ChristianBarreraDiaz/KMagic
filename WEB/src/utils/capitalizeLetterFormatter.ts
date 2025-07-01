export const capitalizeFirstLetter = (inputString: string): string => {
  if (typeof inputString !== "string") {
    // Handle the case where the input is not a string
    return inputString;
  }

  // Remove leading and trailing spaces, and ensure the input is not empty
  const trimmedString = inputString.trim();

  if (trimmedString.length === 0) {
    return trimmedString;
  }

  // Convert the first letter to uppercase and the rest to lowercase
  return (
    trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1).toLowerCase()
  );
};
