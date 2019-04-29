const got = require('got')
const axios = require('axios')
const APIURL = require('../../keys')

const bookingUrl = (process.env.API_URL || `${APIURL.bookingUrl}`) + '/api'

/**
 * getLocationsAndResources: retrieves each Locations with the Resources that belong to it,
 *                           if a resource has a feature associated with it, this will be returned too.
 *
 * @returns API response: Locations and Resources
 *
 */

async function getLocationsAndResources() {

    try {

        const filter = '{"include":{"relation":"resources","scope":{"where":{"active":true},"include":"features"}}}'
        return await axios.get(`${bookingUrl}/Locations?filter=${filter}`)
    } catch
        (error) {
        console.error(error)
    }
}

/**
 * getResourceBookings: returns bookings for a resource with a given ID
 *
 * @param id
 * @returns API response: Resource Bookings for ID
 */

async function getResourceBookings(id) {
    try {
        return await axios.get(`${bookingUrl}/Resources/${id}/bookings`)

    } catch
        (error) {
        console.error(error)
    }
}

/**
 * removeBooking: removes a booking with a given resourceId
 *
 * @param id
 * @returns API response: Booking deletion confirmation
 */

async function removeBooking(id) {
    try {
        return await axios.delete(`${bookingUrl}/Bookings/${id}`)

    } catch
        (error) {
        console.error(error)
    }
}

/**
 * bookResource: creates a booking for a resource with a body of details provided
 *
 * @param body
 *
 * params in body: startDate, endDate, description, title, resourceId
 *  @returns API response: Booking confirmation
 *
 */

function bookResource(body) {
    return got.post(`${bookingUrl}/Bookings`, {json: true, body})
}

module.exports = {
    getLocationsAndResources: getLocationsAndResources,
    getResourceBookings: getResourceBookings,
    bookResource: bookResource,
    removeBooking: removeBooking
}
