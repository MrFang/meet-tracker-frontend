<template>
    <GridHeader class="mb-2 mt-2" />
    <div class="row flex-nowrap">
        <div class="col-9 p-0">
            <div class="row mb-2">
                <GridToolPanel
                    v-model:dateString="dateString"
                    @createMeeting="createMeeting"
                    @meetingClicked="dateString = $event.date"
                />
            </div>
            <MeetingsSchedule
                :weekDates="weekDates"
                :meetingsList="meetingsList"
                @meetingClicked="clickedMeeting = $event"
            />
        </div>
        <div class="col ml-2 border">
            <GridContactList
                :contacts="contactsList"
                @contactClicked="clickedContact = $event"
                @createContact="createContact"
            />
        </div>
    </div>
    <AppModal v-if="clickedMeeting">
        <template v-slot:header>
            <div class="row">
                <h3 class="col-11">{{clickedMeeting.title}}</h3>
                <button @click="clickedMeeting = null" class="col" style="border: 0; background-color: transparent;">X</button>
            </div>
        </template>
        <template v-slot:body>
            <MeetingForm
                v-model:meeting="clickedMeeting"
                @submit="submitMeeting(clickedMeeting)"
                @delete="deleteMeeting(clickedMeeting)"
            />
        </template>
    </AppModal>
    <AppModal v-if="clickedContact">
        <template v-slot:header>
            <div class="row">
                <h3 class="col-11">{{clickedContact.firstName}} {{clickedContact.secondName}}</h3>
                <button @click="clickedContact = null" class="col" style="border: 0; background-color: transparent;">X</button>
            </div>
        </template>
        <template v-slot:body>
            <ContactForm
                v-model:contact="clickedContact"
                @submit="submitContact(clickedContact)"
                @delete="deleteContact(clickedContact)"
            />
        </template>
    </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GridToolPanel from './GridToolPanel.vue'
import GridContactList from './GridContactList.vue'
import moment, { Moment } from 'moment'
import { createMeeting, deleteMeeting, getMeetings, updateMeeting } from '@/api/meetings'
import { Contact, Meeting } from '@/common/types'
import AppModal from '@/components/AppModal.vue'
import MeetingForm from '@/components/meetings/EditMeetingForm.vue'
import MeetingsSchedule from './MeetingsSchedule.vue'
import GridHeader from './GridHeader.vue'
import ContactForm from '@/components/contacts/EditContactForm.vue'
import { createContact, deleteContact, getContacts, updateContact } from '@/api/contacts'

@Options({
    components: {
        GridToolPanel,
        GridContactList,
        AppModal,
        MeetingForm,
        ContactForm,
        MeetingsSchedule,
        GridHeader
    },
    watch: {
        monday (newMonday: Moment, oldMonday: Moment): void {
            if (newMonday.format('YYYY-MM-DD') !== oldMonday.format('YYYY-MM-DD')) {
                this.getMeetings()
            }
        }
    }
})
export default class GridLayout extends Vue {
    private clickedMeeting: Meeting | null = null
    private clickedContact: Contact | null = null
    private requestedDay = moment()
    private meetingsList: Meeting[] = []
    private contactsList: Contact[] = []

    created (): void {
        this.getMeetings()
        this.getContacts()
    }

    get monday (): Moment {
        return moment(this.requestedDay).subtract(this.requestedDay.isoWeekday() - 1, 'days')
    }

    get weekDates (): string[] {
        const week = []

        for (let i = 0; i < 7; i++) {
            week.push(
                moment(this.monday)
                    .add(i, 'days')
                    .locale('ru')
                    .format('dd, DD.MM')
            )
        }

        return week
    }

    get dateString (): string {
        return this.requestedDay.format('YYYY-MM-DD')
    }

    set dateString (newValue: string) {
        this.requestedDay = moment(newValue)
    }

    private createMeeting (): void {
        this.clickedMeeting = {
            title: '',
            startDate: moment().format('YYYY-MM-DD'),
            startTime: moment().format('HH:mm'),
            duration: 30,
            contacts: []
        }
    }

    private submitMeeting (meeting: Meeting): void {
        (meeting.id ? updateMeeting(meeting) : createMeeting(meeting))
            .then(() => this.getMeetings())
            .then(() => { this.clickedMeeting = null })
    }

    private deleteMeeting (meeting: Meeting): void {
        meeting.id
            ? deleteMeeting(meeting.id)
                .then(() => this.getMeetings())
                .then(() => { this.clickedMeeting = null })
            : this.clickedMeeting = null
    }

    private async getMeetings (): Promise<void> {
        const mondayDateString = this.monday.format('YYYY-MM-DD')
        const sundayDateString = moment(this.monday).add(6, 'days').format('YYYY-MM-DD')

        return getMeetings(mondayDateString, sundayDateString)
            .then((meetings) => { this.meetingsList = meetings })
    }

    private createContact (): void {
        this.clickedContact = {
            firstName: ''
        }
    }

    private submitContact (contact: Contact): void {
        (contact.id ? updateContact(contact) : createContact(contact))
            .then(() => this.getContacts())
            .then(() => { this.clickedContact = null })
    }

    private deleteContact (contact: Contact): void {
        contact.id
            ? deleteContact(contact.id)
                .then(() => this.getContacts())
                .then(() => { this.clickedContact = null })
            : this.clickedContact = null
    }

    private async getContacts (): Promise<void> {
        return getContacts()
            .then((contacts) => { this.contactsList = contacts })
    }
}
</script>

<style scoped>
</style>
