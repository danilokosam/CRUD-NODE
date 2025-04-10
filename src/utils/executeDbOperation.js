export const executeDbOperation = async (dbOperation, errorMessage) => {
  try {
    return await dbOperation();
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};
