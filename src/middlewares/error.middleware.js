const errorHandler = (err, req, res, next) => {
  console.log("🔥 Error middleware hit");

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
};

export default errorHandler;