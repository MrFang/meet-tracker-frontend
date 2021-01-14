import { BASE_API_URL } from '.'
import { Meeting } from '@/common/types'
import { Meeting as APIMeeting, APIResponseWithData, APIResponseWithoutData } from './types'
import axios from 'axios'

const BASE_MEETINGS_API_URL = BASE_API_URL + '/meetings'

function APIMeetingToMeeting (apiMeeting: APIMeeting): Meeting {
    return {
        id: apiMeeting.id,
        title: apiMeeting.title,
        date: apiMeeting.datetime.split('T')[0],
        time: apiMeeting.datetime.split('T')[1]
    }
}

export async function createMeeting (params: Meeting): Promise<void> {
    axios.post<APIResponseWithoutData>(
        `${BASE_MEETINGS_API_URL}/create`,
        {
            title: params.title,
            datetime: params.date + 'T' + params.time
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}

export async function updateMeeting (params: Meeting): Promise<void> {
    axios.put<APIResponseWithoutData>(
        `${BASE_MEETINGS_API_URL}/update`,
        {
            id: params.id,
            title: params.title,
            datetime: params.date + 'T' + params.time
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}

export async function getMeetings (): Promise<Meeting[]> {
    const data: APIMeeting[] = await axios.get<APIResponseWithData<APIMeeting[]>>(
        `${BASE_MEETINGS_API_URL}/list`
    ).then((resp) => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data.map(APIMeetingToMeeting)
}

export async function getMeeting (id: number): Promise<Meeting> {
    const data: APIMeeting = await axios.get<APIResponseWithData<APIMeeting>>(
        `${BASE_MEETINGS_API_URL}/get?id=${id}`
    ).then((resp) => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return APIMeetingToMeeting(data)
}

export async function deleteMeeting (id: number): Promise<void> {
    axios.delete<APIResponseWithoutData>(
        `${BASE_MEETINGS_API_URL}/delete`,
        { data: { id } }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}
