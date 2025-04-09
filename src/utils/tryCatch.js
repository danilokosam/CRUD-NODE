export const tryCatchFn = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/*
 Usage example in a controller
export const login = tryCatchFn(async (req, res, next) => {});
*/
