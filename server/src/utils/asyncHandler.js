/**
 * Wraps asynchronous controller route handlers to forward errors to the global error middleware.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
