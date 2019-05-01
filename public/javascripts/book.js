const $bookingForm = document.querySelector('#bookForm')
const $removeForm = document.querySelector('#removeForm')
const $removeSwitch = document.querySelector('#remove')

window.onload = function () {
    switchToggle()
}


$removeSwitch.addEventListener('click', (e) => {
    /**
     * On click of remove switch, toggle the visibility of the remove/add booking form
     */
    switchToggle()
})

function switchToggle() {
    if ($removeSwitch.checked === true) {
        $removeForm.style.display = "block"
        $bookingForm.style.display = "none"
    } else {
        $removeForm.style.display = "none"
        $bookingForm.style.display = "block"
    }
}

function validateForm() {
    const $name = document.getElementById('name').value.trim()
    const $description = document.getElementById('description').value.trim()
    const $startTime = document.getElementById('startTime').value
    const $startDay = document.getElementById('startDay').value
    const $endTime = document.getElementById('endTime').value
    const $endDay = document.getElementById('endDay').value
    const $bookingRemovalId = document.getElementById('bookingRemovalId').value

    const errorMessages = document.querySelectorAll(".govuk-error-message")

    var arrayLength = errorMessages.length;
    for (var i = 0; i < arrayLength; i++) {
        errorMessages[i].parentNode.removeChild(errorMessages[i])
    }

    if ($removeForm.style.display === "none") {

        if ($name === "") {

            html = "<span id=\"name-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a name for the Meeting\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="name"]')[0];
            $formField.insertAdjacentHTML('afterend', html)

            return false
        } else if ($description === "") {
            html = "<span id=\"description-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a description for the Meeting\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="description"]')[0];
            $formField.insertAdjacentHTML('afterend', html)

            return false
        } else if ($startTime === $endTime) {
            html = "<span id=\"no-time-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a valid amount of time\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', html)

            return false
        } else if ($endTime < $startTime) {
            html = "<span id=\"start-after-end-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> 'Start time' must be before the 'End time'\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', html)

            return false
        } else if ($startDay !== $endDay) {
            html = "<span id=\"start-end-diff-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> Start and End day must be the same\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', html)

            return false
        }
    } else {
        $bookingRemovalId.trim()
        if ($bookingRemovalId === "") {
            html = "<span id=\"booking-ref-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a booking reference id\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="bookingRemovalId"]')[0];
            $formField.insertAdjacentHTML('afterend', html)
            return false
        }
    }

}


