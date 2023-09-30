function validation(req, res, next) {
    if (req.session.inAuth) {
        next()
    } else {
        res.redirect('/admin/')
    }
}

module.exports = validation