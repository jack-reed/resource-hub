const bookingApi = require('../../libs/booking-api')

/**
 *  Executed on GET of page,
 *  Calls API for Locations and Resources,
 *  If a location is found then the resources that belong to it are returned
 *
 *  Renders 'choose a resource' page with modelled data
 */

function get(req, res, next) {
    bookingApi.getLocationsAndResources()
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