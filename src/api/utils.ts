import { Contact } from '@/common/types'
import { Contact as APIContact } from './types'

export function APIContactToContact (apiContact: APIContact): Contact {
    return {
        id: apiContact.id,
        firstName: apiContact.first_name,
        secondName: apiContact.second_name,
        telephone: apiContact.telephone
    }
}

export function ContactToAPIContact (contact: Contact): APIContact {
    if (!contact.id) {
        throw contact
    }
    return {
        id: contact.id,
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: contact.firstName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        second_name: contact.secondName,
        telephone: contact.telephone
    }
}
