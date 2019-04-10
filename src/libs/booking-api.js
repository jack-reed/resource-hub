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
            .then(function (response) {
                console.log(response.data)
            })
    } catch
        (error) {
        console.error(error)
    }
}

function bookResource(body) {
    return got.post(`${apiUrl}/Bookings`, {json: true, body})
        .then(function (response) {
            console.log(response)
        })

        .catch(err => console.error(err))

}

// async function bookResourceNew(body) {
//     return axios.post(`${apiUrl}/Bookings`, {
//             headers: {
//                 accept: 'application/json',
//                 'content-type': 'application/json'
//             },
//             body: {
//                 start: '2019-04-02T20:32:56.971Z',
//                 end: '2019-04-02T21:32:56.971Z',
//                 name: 'NAAAAAAAME',
//                 description: 'dessssssssc',
//                 resourceId: '5ca346a994043c0017fc26ae'
//             }
//         }
//     ).then(function (response) {
//         console.log(response)
//     }).catch(err => console.error(err))
// }
// async function bookResource(start, end, name, desc, resId) {
//     try {
//         return await axios.post(`${apiUrl}/Bookings`, null, {
//             params: {
//                 start: start,
//                 end: end,
//                 description: desc,
//                 name: name,
//                 resourceId: resId
//
//             }
//         })
//             .then(function (response) {
//                 console.log(response)
//             })
//
//     } catch
//         (error) {
//         console.error(error)
//     }
// }

const body = {
    start: '2019-04-02T02:32:56.971Z',
    end: '2019-04-02T04:32:56.971Z',
    name: 'NAAAAAAAME',
    description: 'dessssssssc',
    resourceId: '5ca346a994043c0017fc26ae'
}

// getRoomBookings('5ca346a994043c0017fc26ae')
// getLocationsAndRooms()

module.exports = {
    getLocationsAndRooms: getLocationsAndRooms,
    getRoomBookings: getLocationsAndRooms,
    bookResource: bookResource
}
