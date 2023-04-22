export const checkNumberOfParameters = (parameters, neededNumber) => {
  const isCorrectNumber = parameters.length === neededNumber;
  if (!isCorrectNumber) {
    throw new Error(`Incorrect number of parameters. Should be ${neededNumber} parameters.`);
  }

  return true;
}