function get(req, res, next) {
    res.render('index', {
        title: `Newcastle's Digital Delivery Centre Resource Hub`
    })
}

module.exports = get