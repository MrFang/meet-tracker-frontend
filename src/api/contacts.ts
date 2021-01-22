import { Contact } from '@/common/types'
import axios from 'axios'
import { BASE_API_URL } from '.'
import { APIResponseWithData, APIResponseWithoutData, Contact as APIContact } from './types'
import { APIContactToContact } from './functions'

const BASE_CONTACTS_API_URL = BASE_API_URL + '/contacts'

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
            // eslint-disable-next-line
            first_name: contact.firstName,
            // eslint-disable-next-line
            second_name: contact.secondName,
            telephone: contact.telephone
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}

export async function getContact (id: number): Promise<Contact> {
    const data: APIContact = await axios.get<APIResponseWithData<APIContact>>(
        `${BASE_CONTACTS_API_URL}/get?id=${id}`
    ).then(resp => {
        if (!resp.data.success) {
            return Promise.reject(resp.data.error)
        }

        return resp.data.data
    })

    return APIContactToContact(data)
}

export async function deleteContact (id: number): Promise<void> {
    await axios.delete<APIResponseWithoutData>(
        `${BASE_CONTACTS_API_URL}/delete`,
        { data: { id } }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}

export async function updateContact (contact: Contact) {
    await axios.put<APIResponseWithoutData>(
        `${BASE_CONTACTS_API_URL}/update`,
        {
            id: contact.id,
            // eslint-disable-next-line
            first_name: contact.firstName,
            // eslint-disable-next-line
            second_name: contact.secondName,
            telephone: contact.telephone
        }
    ).then((resp) => resp.data.success ? null : Promise.reject(resp.data.error))
}
