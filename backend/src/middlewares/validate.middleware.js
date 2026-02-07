const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password){
        const err = new Error("username and password required");
        err.statusCode = 400;
        return next(err);
    }
    next();
}

const validateSubscribe = (req, res, next) => {
    const { instrumentName } = req.body;
    if(!instrumentName) {
        const err = new Error("instrumentName required");
        err.statusCode = 400;
        return next(err);
    }
    next();
};

module.exports = {
    validateLogin,
    validateSubscribe
};
