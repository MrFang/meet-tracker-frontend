import { Contact } from '@/common/types'
import { withAuth } from './axios'
import { SuccessAPIResponseWithData, SuccessAPIResponseWithoutData, Contact as APIContact } from './types'
import { APIContactToContact } from './utils'

export async function getContacts (): Promise<Contact[]> {
    const data: APIContact[] = await withAuth.get<SuccessAPIResponseWithData<APIContact[]>>(
        'contacts/list'
    ).then(resp => {
        return resp.data.data
    })

    return data.map(APIContactToContact)
}

export async function createContact (contact: Contact): Promise<void> {
    await withAuth.post<SuccessAPIResponseWithoutData>(
        'contacts/create',
        {
            // eslint-disable-next-line
            first_name: contact.firstName,
            // eslint-disable-next-line
            second_name: contact.secondName,
            telephone: contact.telephone
        }
    )
}

export async function getContact (id: number): Promise<Contact> {
    const data: APIContact = await withAuth.get<SuccessAPIResponseWithData<APIContact>>(
        `constacts/get?id=${id}`
    ).then(resp => {
        return resp.data.data
    })

    return APIContactToContact(data)
}

export async function deleteContact (id: number): Promise<void> {
    await withAuth.delete<SuccessAPIResponseWithoutData>(
        'contacts/delete',
        { data: { id } }
    )
}

export async function updateContact (contact: Contact) {
    await withAuth.put<SuccessAPIResponseWithoutData>(
        `contacts/update`,
        {
            id: contact.id,
            // eslint-disable-next-line
            first_name: contact.firstName,
            // eslint-disable-next-line
            second_name: contact.secondName,
            telephone: contact.telephone
        }
    )
}
