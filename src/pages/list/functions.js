const bookingApi = require('../../libs/booking-api')

function get(req, res, next) {
    bookingApi.getLocationsAndRooms()
        .then(function (response) {
            const location = response.data[0].name
            res.render('choose-a-resource', {
                title: `Resources available at ${location}`,
                'Location': location,
                'resources': response.data[0].resources
            })
        })
}

module.exports = get