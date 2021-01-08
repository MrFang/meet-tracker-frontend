import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL } from '.'
import { PostMeetingData, Meeting, APIResponseWithData, APIResponseWithoutData } from '@/common/types'

const BASE_MEETINGS_API_URL = BASE_API_URL + '/meetings'

export async function createMeeting (params: PostMeetingData): Promise<void> {
    axios.post<PostMeetingData, AxiosResponse<APIResponseWithoutData>>(
        `${BASE_MEETINGS_API_URL}/create`,
        {
            title: params.title,
            datetime: params.datetime
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}

export async function getMeetingsList (): Promise<Meeting[]> {
    const data: Meeting[] = await axios.get<void, AxiosResponse<APIResponseWithData<Meeting[]>>>(
        `${BASE_MEETINGS_API_URL}/list`
    ).then((resp) => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data
}

export async function getMeeting (id: number): Promise<Meeting> {
    const data: Meeting = await axios.get<void, AxiosResponse<APIResponseWithData<Meeting>>>(
        `${BASE_MEETINGS_API_URL}/get?id=${id}`
    ).then((resp) => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data
}

export async function deleteMeeting (id: number): Promise<void> {
    axios.delete<{id: number}, AxiosResponse<APIResponseWithoutData>>(
        `${BASE_MEETINGS_API_URL}/delete`,
        { data: { id } }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}
