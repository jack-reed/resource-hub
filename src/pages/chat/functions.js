/**
 *  Executed on GET of page,
 *
 *  Renders 'Help Centre' page with 'Title'
 */

function get(req, res) {
    res.render('chatbot', {
        title: 'Resource Hub Help Centre'
    })
}

module.exports = get