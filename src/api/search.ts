import { Contact } from '@/common/types'
import axios from 'axios'
import { BASE_API_URL } from '.'
import { APIContactToContact } from './functions'
import { APIResponseWithData, Contact as APIContact } from './types'

const BASE_SEARCH_API_URL = BASE_API_URL + '/search'

export async function searchContacts (query: string): Promise<Contact[]> {
    const data = await axios.get<APIResponseWithData<APIContact[]>>(
        `${BASE_SEARCH_API_URL}/contacts?q=${query}`
    ).then(resp => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data.map(APIContactToContact)
}
