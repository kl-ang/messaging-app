// Generates a random 4-digit number
export const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Generates a random byte
export const generateRandomByte = () => {
  return (
    Math.floor(1 + Math.random() * 9) +
    "." +
    Math.floor(1 + Math.random() * 9) +
    " MB"
  );
};
