const validateIsAdmin = async(req, res, next) => {
    const { isAdmin } = req.user
    if (isAdmin === false) {
        res.status(401).send({ message: "Not Authorized" });
    } else {
        next();
    }
}

module.exports = validateIsAdmin;