'use strict'
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
            .then(function (response) {
                console.log(response.data)
            })
    } catch
        (error) {
        console.error(error)
    }
}

getRoomBookings('5ca346a994043c0017fc26ae')
// getLocationsAndRooms()

module.exports = getLocationsAndRooms
