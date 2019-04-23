const bookingApi = require('../../libs/booking-api')

function get(req, res, next) {
    const body = res.body

    const resourceId = req.body.resourceId

    console.log(body)
    bookingApi.getRoomBookings(resourceId)
        .then(function (response) {

        })

    res.render('confirmation', {
    })
}

module.exports = get