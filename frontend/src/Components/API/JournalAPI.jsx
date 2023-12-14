import axios from 'axios'


export default class JournalService {
    static async getAllJournals(limit = 10, page = 1, apiPort, apiHost) {
        const response = await axios
            .get(`http://${apiHost}:${apiPort}/api/v1/reports`, {
                params: {
                    limit: limit,
                    page: page
                }
            })
        return response.data
    }

    static async getJournalByEmail(email, apiPort, apiHost) {
        const response = await axios
            .get(`http://${apiHost}:${apiPort}/api/v1/reports/` + email, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    }

    static async getListReports(apiPort, apiHost) {
        const response = await axios
            .get(`http://${apiHost}:${apiPort}/api/v1/list_reports_for_subscription`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    }
}