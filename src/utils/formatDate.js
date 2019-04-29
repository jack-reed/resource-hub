/**
 * This date formatter takes a date and time and returns an ISO date which can be provided to the API
 */

/**
 * @param time
 * @returns: number
 */

function formatHours(time) {
    const decoded = decodeURIComponent(time)
    time = decoded.split(':')
    const hour = parseInt(time[0])

    if (hour.toString().length === 1) {
        return "0" + hour
    } else {
        return hour
    }
}

/**
 *
 * @param time
 * @returns number
 */

function formatMins(time) {
    const decoded = decodeURIComponent(time)
    time = decoded.split(':')
    const min = parseInt(time[1])

    if (min.toString().length === 1) {
        return "0" + min
    } else {
        return min
    }
}

/**
 *
 * @param time
 * @param day
 * @param month
 * @param year
 * @returns {Date}
 *
 */
module.exports = function (time, day, month, year) {
    const minutes = formatMins(time)
    const hours = formatHours(time)

    const date = new Date(year, month, day, hours, minutes)
    date.setMonth(date.getMonth() - 1)
    date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
    return date

}