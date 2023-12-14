import axios from 'axios'


export default class MessageService {
    static async getAllMessages(limit = 10, page = 1, apiPort, apiHost) {
        const response = await axios
            .get(`http://${apiHost}:${apiPort}/api/v1/messages`, {
                params: {
                    limit: limit,
                    page: page
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    }

    static async getMessageById(id, apiPort, apiHost) {
        const response = await axios
            .get(`http://${apiHost}:${apiPort}/api/v1/messages/` + id, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    }
}