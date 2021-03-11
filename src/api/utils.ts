import { Contact, Meeting } from '@/common/types'
import moment from 'moment'
import { Contact as APIContact, Meeting as APIMeeting } from './types'

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

export function APIMeetingToMeeting (apiMeeting: APIMeeting): Meeting {
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
