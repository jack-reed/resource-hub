function get(req, res, next) {
    res.render('book-a-resource', {
            title: 'Book a Resource'
        }
    )
}

module.exports = get