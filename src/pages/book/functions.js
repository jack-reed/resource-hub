const bookApi = require('../../libs/booking-api')
const formatDate = require('../../utils/formatDate')

function get(req, res, next) {

    const d = new Date()

    const day = d.toLocaleString('en-us', {day: '2-digit'})
    const month = d.toLocaleString('en-us', {month: '2-digit'})
    const year = d.toLocaleString('en-us', {year: 'numeric'})

    res.render('book-a-resource', {
            title: 'Book a Resource',
            day: day,
            month: month,
            year: year
        }
    )
}

function post(req, res, next) {
    const resourceId = req.params

    const {
        name = '', description = '', startTime = '', startDay = '', startMonth = '', startYear = '',
        endTime = '', endDay = '', endMonth = '', endYear = ''
    } = req.body

    const values = {
        name, description, startTime, startDay, startMonth, startYear, endTime, endDay, endMonth, endYear
    }

    const start = formatDate(startTime, startDay, startMonth, startYear)
    const end = formatDate(endTime, endDay, endMonth, endYear)
    bookApi.bookResource({start, end, name, description, resourceId})
        .then(function (response) {
            console.log(response.data)
        })
}

module.exports = {get, post}
