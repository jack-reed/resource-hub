const generateMessage = (username = "jack", text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }

}

module.exports = generateMessage
