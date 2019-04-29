const socket = io()

const $chatWindow = document.querySelector('.window')
const $chatForm = document.querySelector('form')
const $chatFormButton = $chatForm.querySelector('button')
const $chatFormInput = document.querySelector('input')


/**
 * On click of remove switch, toggle the visibility of the remove/add booking form
 */

window.onload = function () {
    const time = new Date().toLocaleTimeString()
    const message = "Welcome to the Help Centre, I'm here to help. So feel free to ask me " +
        "any questions around acquiring resources in Newcastle's Digital Delivery Centre."

    presentMessage("HMRC Digital Resource Bot", time, message, "response")
}

/**
 * On message call at server level, user's question is printed dynamically in window.
 */

socket.on('message', (message) => {
    const time = moment(message.createdAt).format('h:mm a')

    presentMessage(message.username, time, message.text, "request")
})


/**
 * On message response at server level, response to user's question is printed dynamically in window.
 */
socket.on('response', (message) => {
    const time = moment(message.createdAt).format('h:mm a')
    presentMessage(message.username, time, message.text, "response")

})

/**
 * On click of submit button switch, message is validated.
 *
 * Sockets 'sendMessage' function is called to server where the message is retrieved
 * On successful response, delivery message is logged in console.
 *
 */

$chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $chatFormInput.value.replace(/(^\s+|\s+$)/g, '')
    console.log($chatFormInput.value)

    if ($chatFormInput.value.length === 0) {
        console.log("EMPTY!")
    } else {

        $chatFormButton.setAttribute('disabled', 'disabled')

        const message = $chatFormInput.value

        socket.emit('sendMessage', message, (error) => {
            $chatFormButton.removeAttribute('disabled')
            $chatFormInput.value = ''
            $chatFormInput.focus()

            if (error) {
                return console.log(error)
            }
            console.log('Message delivered!')
        })
    }
})

/**
 * Presents Message with a given name, time, message.
 *
 * Type (request or response) is determined by the 'type' parameter
 *
 * Presented message is inserted into the chat window before scrolling to the bottom.
 */

function presentMessage(name, time, message, type) {
    var html
    if (type === "response") {
        html = "<div class=\"textBox\">\n" +
            "        <div class=\"right\">\n" +
            "            <img src=\"/images/blue.png\"></a>\n" +
            "        </div>\n" +
            "        <div class=\"text right\">\n" +
            "            <div class=\"right\">\n" +
            "                <span class=\"chat-line-1\">" + name + "</span>\n" +
            "                <span class=\"chat-line-1\">" + time + "</span>\n" +
            "            </div>\n" +
            "            <p>" + message + "</p>\n" +
            "        </div>\n" +
            "    </div>\n"
    } else if (type === "request") {

        html = "<div class=\"textBox\">\n" +
            "        <div class=\"left\">\n" +
            "            <img src=\"/images/yellow.png\"></a>\n" +
            "        </div>\n" +
            "        <div class=\"text left\">\n" +
            "            <div class=\"left\">\n" +
            "                <span class=\"chat-line-1\">" + name + "</span>\n" +
            "                <span class=\"chat-line-1\">" + time + "</span>\n" +
            "            </div>\n" +
            "            <p>" + message + "</p>\n" +
            "        </div>\n" +
            "    </div>\n"
    }
    $chatWindow.insertAdjacentHTML('beforeend', html)
    $chatWindow.scrollTop = $chatWindow.scrollHeight;
}