const axios = require('axios')

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', request)
//     return request
// })

 async function sendMessage() {
    try {
        return await axios.post('https://api.pandorabots.com/atalk/', null, {
            params: {
                botkey: 'auVe4pZaFgw0jadMAyG1QdriBlNwo-EQMDgHt37BFuGi5XrjpDLaow4qv6EMIJ3dXIm_9KOKSnhYlMG121I3sYQRU15Pt2ZE',
                input: 'how are you today?'
            }
        })
            .then(function (response) {
                console.log(response.data.responses[0]);
            })
    } catch (error) {
        console.error(error)
    }

}

exports.sendMessage = sendMessage()
