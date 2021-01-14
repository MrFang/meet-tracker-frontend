import { Contact } from '@/common/types'
import axios from 'axios'
import { BASE_API_URL } from '.'
import { APIResponseWithData } from './types'

const BASE_CONTACTS_API_URL = BASE_API_URL + '/contacts'

export async function getContacts (): Promise<Contact[]> {
    const data: Contact[] = await axios.get<APIResponseWithData<Contact[]>>(
        `${BASE_CONTACTS_API_URL}/list`
    ).then(resp => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data
}
