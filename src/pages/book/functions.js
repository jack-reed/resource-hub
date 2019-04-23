const bookApi = require('../../libs/booking-api')
const formatDate = require('../../utils/formatDate')
const bookingApi = require('../../libs/booking-api')
const validator = require('validator')

function get(req, res, next) {
    const resourceId = req.params.resourceId
    bookingApi.getRoomBookings(resourceId)
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
            console.log(jsonDates)
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

function post(req, res, next) {
    const resourceId = req.params.resourceId

    const {
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

    const start = formatDate(startTime, startDay, startMonth, startYear)
    const end = formatDate(endTime, endDay, endMonth, endYear)
    // bookApi.bookResource({start, end, description, name, resourceId})
    //     .then(function (response) {
    //         console.log(response.body)
    //         req.body = response.body
    //         const date = start.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    //         res.render('confirmation', {
    //             title: name,
    //             start: startTime,
    //             end: endTime,
    //             date: date
    //
    //         })
    //     })
    //     .catch(err => console.error(err))
    const date = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
    res.render('confirmation', {
        name: name,
        start: startTime,
        end: endTime,
        date: date,
        resourceId: resourceId
    })
}


module.exports = {get, post}
