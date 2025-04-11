/**
 * Executes a database operation and handles potential errors with a custom message.
 * @param {Function} dbOperation - An async function representing the database operation to execute.
 * @param {string} errorMessage - A custom error message to prepend if the operation fails.
 * @returns {Promise<any>} The result of the database operation if successful.
 * @throws {Error} A new Error with a combined message if the operation fails.
 */
export const executeDbOperation = async (dbOperation, errorMessage) => {
  try {
    // Attempt to execute the provided database operation and return its result
    return await dbOperation();
  } catch (error) {
    // If the operation fails, throw a new Error with the custom message and original error details
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};
