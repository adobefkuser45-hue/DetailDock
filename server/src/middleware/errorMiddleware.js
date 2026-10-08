/**
 * Centralized global error handling middleware.
 */
export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected server error occurred.';

  // In production, suppress technical stack traces to prevent info disclosure
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    console.error(`[DetailDock Error] ${req.method} ${req.originalUrl} ->`, err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
      ...(isDev && { stack: err.stack })
    }
  });
};
