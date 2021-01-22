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
