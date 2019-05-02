const $bookingForm = document.querySelector('#bookForm')
const $removeForm = document.querySelector('#removeForm')
const $removeSwitch = document.querySelector('#remove')

/**
 * On window load, ensure form is toggled
 */

window.onload = function () {
    switchToggle()
}


/**
 * On click of remove switch, toggle the visibility of the remove/add booking form
 */

$removeSwitch.addEventListener('click', (e) => {
    switchToggle()
})


/**
 * When called this method toggles the visibility of the remove/add booking form
 */
function switchToggle() {
    if ($removeSwitch.checked === true) {
        $removeForm.style.display = "block"
        $bookingForm.style.display = "none"
    } else {
        $removeForm.style.display = "none"
        $bookingForm.style.display = "block"
    }
}

/**
 * Depending on the status of the checkbox, validate the relevant form
 *
 * If the validation error is caught, insert the appropriate error message
 * On call of the method, remove all error messages before validating
 *
 * @returns boolean if error found
 */

function validateForm() {

    //Gather values in form fields and trim whitespace
    const $name = document.getElementById('name').value.trim()
    const $description = document.getElementById('description').value.trim()
    const $startTime = document.getElementById('startTime').value.trim()
    const $startDay = document.getElementById('startDay').value.trim()
    const $endTime = document.getElementById('endTime').value.trim()
    const $endDay = document.getElementById('endDay').value.trim()
    const $bookingRemovalId = document.getElementById('bookingRemovalId').value.trim()

    const errorMessages = document.querySelectorAll(".govuk-error-message")

    var arrayLength = errorMessages.length;
    for (var i = 0; i < arrayLength; i++) {
        errorMessages[i].parentNode.removeChild(errorMessages[i])
    }
    if ($removeSwitch.checked === false) {

        if ($name === "") {

            const message = "<span id=\"name-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a name for the Meeting\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="name"]')[0];
            $formField.insertAdjacentHTML('afterend', message)

            return false
        } else if ($description === "") {
            const message = "<span id=\"description-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a description for the Meeting\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="description"]')[0];
            $formField.insertAdjacentHTML('afterend', message)

            return false
        } else if ($startTime === $endTime) {
            const message = "<span id=\"no-time-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a valid amount of time\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', message)

            return false
        } else if ($endTime < $startTime) {
            const message = "<span id=\"start-after-end-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> 'Start time' must be before the 'End time'\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', message)

            return false
        } else if ($startDay !== $endDay) {
            const message = "<span id=\"start-end-diff-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> Start and End day must be the same\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="StartDate"]')[0];
            $formField.insertAdjacentHTML('afterend', message)

            return false
        }
    } else {
        if ($bookingRemovalId === "") {
            const message = "<span id=\"booking-ref-empty-error\" class=\"govuk-error-message\">\n" +
                "<span class=\"govuk-visually-hidden\">Error:</span> You must enter a booking reference id\n" +
                "</span>"
            const $formField = document.querySelectorAll('[for="bookingRemovalId"]')[0];
            $formField.insertAdjacentHTML('afterend', message)
            return false
        }
    }

}


