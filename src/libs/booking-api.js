const got = require('got')
const axios = require('axios')

const apiUrl = (process.env.API_URL || 'https://final-project-booking-api.herokuapp.com') + '/api'

async function getLocationsAndRooms() {

    try {

        const filter = '{"include":{"relation":"resources","scope":{"where":{"active":true},"include":"features"}}}'
        return await axios.get(`${apiUrl}/Locations?filter=${filter}`)
    } catch
        (error) {
        console.error(error)
    }
}

async function getRoomBookings(id) {
    try {
        return await axios.get(`${apiUrl}/Resources/${id}/bookings`)

    } catch
        (error) {
        console.error(error)
    }
}

function bookResource(body) {
    return got.post(`${apiUrl}/Bookings`, {json: true, body})
}

module.exports = {
    getLocationsAndRooms: getLocationsAndRooms,
    getRoomBookings: getRoomBookings,
    bookResource: bookResource
}
