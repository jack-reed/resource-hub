/**
 * Generates message to be displayed in the frontend
 *
 * @param username
 * @param text
 * @returns {{createdAt: number, text: *, username: string}}
 */

const generateMessage = (username = "jack", text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }

}

module.exports = generateMessage
