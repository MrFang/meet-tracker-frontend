import { Meeting } from '@/common/types'
import { Meeting as APIMeeting, SuccessAPIResponseWithData, SuccessAPIResponseWithoutData } from './types'
import { withAuth } from './axios'
import { APIContactToContact } from './utils'

function APIMeetingToMeeting (apiMeeting: APIMeeting): Meeting {
    return {
        id: apiMeeting.id,
        title: apiMeeting.title,
        date: apiMeeting.datetime.split('T')[0],
        time: apiMeeting.datetime.split('T')[1],
        contacts: apiMeeting.contacts.map(APIContactToContact)
    }
}

export async function createMeeting (meeting: Meeting): Promise<void> {
    await withAuth.post<SuccessAPIResponseWithoutData>(
        'meetings/create',
        {
            title: meeting.title,
            datetime: meeting.date + 'T' + meeting.time,
            contacts: meeting.contacts
        }
    )
}

export async function updateMeeting (params: Meeting): Promise<void> {
    await withAuth.put<SuccessAPIResponseWithoutData>(
        'meetings/update',
        {
            id: params.id,
            title: params.title,
            datetime: params.date + 'T' + params.time
        }
    )
}

export async function getMeetings (): Promise<Meeting[]> {
    const data: APIMeeting[] = await withAuth.get<SuccessAPIResponseWithData<APIMeeting[]>>(
        'meetings/list'
    ).then((resp) => {
        return resp.data.data
    })

    return data.map(APIMeetingToMeeting)
}

export async function getMeeting (id: number): Promise<Meeting> {
    const data: APIMeeting = await withAuth.get<SuccessAPIResponseWithData<APIMeeting>>(
        `meetings/get?id=${id}`
    ).then((resp) => {
        return resp.data.data
    })

    return APIMeetingToMeeting(data)
}

export async function deleteMeeting (id: number): Promise<void> {
    await withAuth.delete<SuccessAPIResponseWithoutData>(
        'meetings/delete',
        { data: { id } }
    )
}
