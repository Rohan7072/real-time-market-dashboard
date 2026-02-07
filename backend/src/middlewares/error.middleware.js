const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err.message);
    res.status(err.statusCode || 500).json({
        error: true,
        message: err.message || "Internal Server Error"
    });
};

module.exports = { errorHandler };