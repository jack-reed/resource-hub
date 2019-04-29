/**
 *  Executed on GET of page,
 *
 *  Renders 'Homepage' with 'Title'
 */

function get(req, res) {
    res.render('index', {
        title: `Newcastle's Digital Delivery Centre Resource Hub`
    })
}

module.exports = get