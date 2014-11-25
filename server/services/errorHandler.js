function errorHandle(err, res, status, type) {
    if (err) {
        res.status(status).send({status: status, message: err.message, type: type});
        res.end();
        return true;
    }
    return false;
}

module.exports = {
    errorHandle: errorHandle
};