import { Contact } from '@/common/types'
import axios from 'axios'
import { BASE_API_URL } from '.'
import { APIResponseWithData, APIResponseWithoutData, Contact as APIContact } from './types'

const BASE_CONTACTS_API_URL = BASE_API_URL + '/contacts'

function APIContactToContact (apiContact: APIContact): Contact {
    return {
        id: apiContact.id,
        firstName: apiContact.first_name,
        secondName: apiContact.second_name,
        telephone: apiContact.telephone
    }
}

export async function getContacts (): Promise<Contact[]> {
    const data: APIContact[] = await axios.get<APIResponseWithData<APIContact[]>>(
        `${BASE_CONTACTS_API_URL}/list`
    ).then(resp => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return data.map(APIContactToContact)
}

export async function createContact (contact: Contact): Promise<void> {
    await axios.post<APIResponseWithoutData>(
        `${BASE_CONTACTS_API_URL}/create`,
        {
            first_name: contact.firstName,
            second_name: contact.secondName,
            telephone: contact.telephone
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}
