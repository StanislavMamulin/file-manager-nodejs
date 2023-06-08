export const checkNumberOfParameters = (parameters, neededNumber) => {
  const isCorrectNumber = parameters.length === neededNumber;
  if (!isCorrectNumber) {
    throw new Error(`Incorrect number of parameters. Should be ${neededNumber} parameters.`);
  }

  return true;
}

export const sortFolderContent = (arr) => {
  const typeSort = (a, b) => {
    if (a.type > b.type) {
      return 1;
    }
    if (a.type < b.type) {
      return -1;
    }

    return 0;
  };

  const nameSort = (a, b) => {
    if (a.type !== b.type) return 0;

    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }

    return 0;
  };

  return arr.sort(typeSort).sort(nameSort);
};
