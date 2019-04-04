function get(req, res, next) {
    res.render('chatbot', {
        title: 'Chatbot'
    })
}

module.exports = get