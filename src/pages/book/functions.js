const bookApi = require('../../libs/booking-api')
const formatDate = require('../../utils/formatDate')
const bookingApi = require('../../libs/booking-api')

/**
 *  Executed on GET of page,
 *  Iterates through data set, amends:
 *  field names to suit FullCalendar tool, formats date,
 *
 *  Renders 'book a resource' page with modelled data
 */

function get(req, res) {
    const resourceId = req.params.resourceId
    bookingApi.getResourceBookings(resourceId)
        .then(function (response) {
            var i;
            for (i = 0; i < response.data.length; i++) {
                response.data[i].title = response.data[i]['name'];
                delete response.data[i].name;
                delete response.data[i].description;
                delete response.data[i].id;
                delete response.data[i].resourceId;

            }

            const dates = response.data
            const jsonDates = JSON.stringify(dates)
            const d = new Date()
            const day = d.toLocaleString('en-us', {day: '2-digit'})
            const month = d.toLocaleString('en-us', {month: '2-digit'})
            const year = d.toLocaleString('en-us', {year: 'numeric'})
            res.render('book-a-resource', {
                    title: 'Book a Resource',
                    day: day,
                    month: month,
                    year: year,
                    dates: jsonDates
                }
            )
        })
        .catch(err => console.error(err))
}


/**
 *  Executed on page submit ,
 *  Checks for empty fields, compares and validates start and end dates.
 *
 *  Takes toggle value to determine form type (add/remove), then provides necessary API call for that function.
 *  On success, renders appropriate confirmation page.
 */

function post(req, res, next) {
    const resourceId = req.params.resourceId

    const {
        remove = '',
        bookingRemovalId = '',
        name = '',
        description = '',
        startTime = '',
        startDay = '',
        startMonth = '',
        startYear = '',
        endTime = '',
        endDay = '',
        endMonth = '',
        endYear = ''
    } = req.body;

    if (remove) {
        bookingApi.removeBooking(bookingRemovalId)
            .then(function (response) {
                if (response.data.count === 0) {

                    res.render('error', {
                        title: "Unrecognised Booking Reference Number"
                    })
                } else {
                    res.render('confirmation', {
                        response: response,
                        book: false
                    })
                }
            })
            .catch(err => console.error(err))
    } else {
        const start = formatDate(startTime, startDay, startMonth, startYear)
        const end = formatDate(endTime, endDay, endMonth, endYear)
        bookApi.bookResource({start, end, description, name, resourceId})
            .then(function (response) {
                const bookingId = response.body.id
                const date = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
                res.render('confirmation', {
                    bookingId: bookingId,
                    book: true,
                    name: name,
                    start: startTime,
                    end: endTime,
                    date: date,

                    resourceId: resourceId
                })
            })
            .catch(err => {
                const message = err.response.body.error.message
                if (message.includes("doubleBooking")) {
                    res.render('error', {
                        title: "Double booking",
                        resourceId: resourceId
                    })
                }
            })
    }
}

module.exports = {get, post}
