const socket = io()

const $chatWindow = document.querySelector('#chat-window')
const $chatForm = document.querySelector('form')
const $chatFormButton = $chatForm.querySelector('button')
const $chatFormInput = document.querySelector('input')

socket.on('message', (message) => {
    const time = moment(message.createdAt).format('h:mm a')

    const html = "<div class=\"chat\">\n" +
        "    <div class=\"\">\n" +
        "    <div class=\"\">\n" +
        "        <span class=\"chat-line-1\">"+message.username+"</span>\n" +
        "        <span class=\"chat-line-1\">" + time + "</span>\n" +
        "    </div>\n" +
        "    <div class=\"chat-line-2\">\n" +
        "        <p>" + message.text + "</p>\n" +
        "    </div>\n" +
        "</div>"
    $chatWindow.insertAdjacentHTML('beforeend', html)
})

socket.on('response', (message) => {
    const time = moment(message.createdAt).format('h:mm a')

    const html = "<div class=\"chat\">\n" +
        "    <div class=\"\">\n" +
        "    <div class=\"\">\n" +
        "        <span class=\"chat-line-1\">"+message.username+"</span>\n" +
        "        <span class=\"chat-line-1\">" + time + "</span>\n" +
        "    </div>\n" +
        "    <div class=\"chat-line-2\">\n" +
        "        <p>" + message.text + "</p>\n" +
        "    </div>\n" +
        "</div>"
    $chatWindow.insertAdjacentHTML('beforeend', html)
})

$chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

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
})