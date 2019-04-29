const $bookingForm = document.querySelector('#bookForm')
const $removeForm = document.querySelector('#removeForm')
const $removeSwitch = document.querySelector('#remove')

$removeSwitch.addEventListener('click', (e) => {
    /**
     * On click of remove switch, toggle the visibility of the remove/add booking form
     */

    if ($removeForm.style.display === "none") {
        $removeForm.style.display = "block"
        $bookingForm.style.display = "none"
    } else {
        $removeForm.style.display = "none"
        $bookingForm.style.display = "block"
    }
})


