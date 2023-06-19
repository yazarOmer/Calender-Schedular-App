import axios from 'axios'

const API_URL = '/api/schedules'

const createSchedule = async (scheduleData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, scheduleData, config)

    return response.data
}

const scheduleService = {
    createSchedule,
}

export default scheduleService