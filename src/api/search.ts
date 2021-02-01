import { Contact } from '@/common/types'
import { withAuth } from './axios'
import { APIContactToContact } from './utils'
import { SuccessAPIResponseWithData, Contact as APIContact } from './types'

export async function searchContacts (query: string): Promise<Contact[]> {
    const data = await withAuth.get<SuccessAPIResponseWithData<APIContact[]>>(
        `search/contacts?q=${query}`
    ).then(resp => {
        return resp.data.data
    })

    return data.map(APIContactToContact)
}
