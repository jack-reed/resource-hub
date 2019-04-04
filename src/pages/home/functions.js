function get(req, res, next) {
    res.render('index', {
        title: 'Home'
    })
}

module.exports = get