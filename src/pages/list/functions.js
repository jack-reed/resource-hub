const getLocationsAndRooms = require('../../libs/booking-api')

function get(req, res, next) {
        getLocationsAndRooms()
        .then(function (response) {
            res.render('choose-a-resource', {
                title: `Resources available at ${response.data[0].name}`,
                'Location': response.data[0].name,
                'resources': response.data[0].resources
            })
        })

}

module.exports = get