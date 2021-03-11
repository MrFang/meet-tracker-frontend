import { Contact, Meeting } from '@/common/types'
import { withAuth } from './axios'
import { APIContactToContact, APIMeetingToMeeting } from './utils'
import { SuccessAPIResponseWithData, Contact as APIContact, Meeting as APIMeeting } from './types'

export async function searchContacts (query: string): Promise<Contact[]> {
    const data = await withAuth.get<SuccessAPIResponseWithData<APIContact[]>>(
        `search/contacts?q=${query}`
    ).then(resp => {
        return resp.data.data
    })

    return data.map(APIContactToContact)
}

export async function searchMeetings (query: string): Promise<Meeting[]> {
    const data = await withAuth.get<SuccessAPIResponseWithData<APIMeeting[]>>(
        `search/meetings?q=${query}`
    ).then(resp => {
        return resp.data.data
    })

    return data.map(APIMeetingToMeeting)
}
