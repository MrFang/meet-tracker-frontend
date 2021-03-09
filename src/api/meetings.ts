import { Meeting } from '@/common/types'
import { Meeting as APIMeeting, SuccessAPIResponseWithData, SuccessAPIResponseWithoutData } from './types'
import { withAuth } from './axios'
import { APIContactToContact, ContactToAPIContact } from './utils'
import moment from 'moment'

function APIMeetingToMeeting (apiMeeting: APIMeeting): Meeting {
    const startDate = moment(apiMeeting.start_datetime, 'YYYY-MM-DDTHH:mm')
    const endDate = moment(apiMeeting.end_datetime, 'YYYY-MM-DDTHH:mm')

    return {
        id: apiMeeting.id,
        title: apiMeeting.title,
        startDate: apiMeeting.start_datetime.split('T')[0],
        startTime: apiMeeting.start_datetime.split('T')[1],
        duration: endDate.diff(startDate, 'minutes'),
        contacts: apiMeeting.contacts.map(APIContactToContact)
    }
}

export async function createMeeting (meeting: Meeting): Promise<void> {
    const startDate = moment(`${meeting.startDate}T${meeting.startTime}`, 'YYYY-MM-DDTHH:mm')
    await withAuth.post<SuccessAPIResponseWithoutData>(
        'meetings/create',
        {
            title: meeting.title,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_datetime: startDate.format('YYYY-MM-DDTHH:mm'),
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_datetime: startDate.add(meeting.duration, 'minutes').format('YYYY-MM-DDTHH:mm'),
            contacts: meeting.contacts.map(ContactToAPIContact)
        }
    )
}

export async function updateMeeting (meeting: Meeting): Promise<void> {
    const startDate = moment(`${meeting.startDate}T${meeting.startTime}`, 'YYYY-MM-DDTHH:mm')
    await withAuth.put<SuccessAPIResponseWithoutData>(
        'meetings/update',
        {
            id: meeting.id,
            title: meeting.title,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_datetime: startDate.format('YYYY-MM-DDTHH:mm'),
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_datetime: startDate.add(meeting.duration, 'minutes').format('YYYY-MM-DDTHH:mm'),
            contacts: meeting.contacts.map(ContactToAPIContact)
        }
    )
}

export async function getMeetings (startDate?: string, endDate?: string): Promise<Meeting[]> {
    let URL = 'meetings/list?'
    if (startDate) {
        URL += `start_date=${startDate}&`
    }
    if (endDate) {
        URL += `end_date=${endDate}&`
    }

    const data: APIMeeting[] = await withAuth.get<SuccessAPIResponseWithData<APIMeeting[]>>(
        URL
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
