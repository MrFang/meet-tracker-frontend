<template>
    <form @submit.prevent="$emit('submit')">
        <div class="row">
            <div class="col-9">
                <div class="row">
                    <div class="form-group col">
                        <input
                            class="form-control" required type="text"
                            :value="meeting.title"
                            @input="$emit('update:meeting', {...meeting, title: $event.target.value})"
                        />
                    </div>
                    <div class="form-group col">
                        <input class="form-control" type="date"
                            :value="meeting.startDate"
                            @input="$emit('update:meeting', {...meeting, startDate: $event.target.value})"
                        />
                    </div>
                    <div class="form-group col">
                        <input class="form-control" type="time"
                            :value="meeting.startTime"
                            @input="$emit('update:meeting', {...meeting, startTime: $event.target.value})"
                        />
                    </div>
                    <div class="form-group col">
                        <select
                            class="form-control"
                            :value="meeting.duration"
                            @change="$emit('update:meeting', {...meeting, duration: Number($event.target.value)})"
                        >
                            <option v-for="i in 12" :value="i * 30" :key="i">{{getDurationString(i * 30)}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <textarea class="form-control" placeholder="Description"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <textarea class="form-control" placeholder="Notes"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label>Участники</label>
                    <div class="contact-names">
                        <span class="contact-name" :key="contact.id" v-for="contact in meeting.contacts">
                            {{contact.firstName}}
                            <button class="btn" @click="removeContact(contact)">X</button>
                        </span>
                    </div>
                    <SearchField
                        class="form-control"
                        :suggestedItems="suggestedParticipants"
                        @inputChange="participantInputChange"
                        @suggestionSelected="addContact"
                    />
                </div>
                <button type="submit" class="btn btn-primary mr-1">Сохранить</button>
                <button class="btn btn-danger ml-1" @click="$emit('cancel')">Отмена</button>
            </div>
            <div class="col"></div>
        </div>

    </form>
</template>

<script lang="ts">
import { Contact, Meeting } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import { searchContacts } from '@/api/search'
import SearchField from '@/components/SearchField.vue'

@Options({
    props: {
        meeting: {
            required: true
        }
    },
    emits: ['update:meeting', 'submit', 'cancel'],
    components: {
        SearchField
    }
})
export default class EditMeetingForm extends Vue {
    private meeting!: Meeting
    private suggestedParticipants: Contact[] = []

    created () {
        this.search('')
    }

    private getDurationString (minutes: number): string {
        const hours = Math.trunc(minutes / 60)
        const hourMinutes = minutes - 60 * hours

        return (hours === 0 ? '' : String(hours) + ' час.') +
            (hourMinutes === 0 ? '' : ' ' + String(hourMinutes) + ' мин.')
    }

    private participantInputChange (newValue: string) {
        this.search(newValue)
    }

    private addContact (item: Contact) {
        this.meeting.contacts.push(item)
        this.suggestedParticipants = this.suggestedParticipants
            .filter((parcipiant) => parcipiant.id !== item.id)
        this.$emit('update:meeting', this.meeting)
    }

    private removeContact (item: Contact) {
        this.meeting.contacts = this.meeting.contacts.filter(contact => contact.id !== item.id)
        this.suggestedParticipants.push(item)
        this.$emit('update:meeting', this.meeting)
    }

    private search (searchString: string) {
        searchContacts(searchString)
            .then(result => {
                this.suggestedParticipants = result
                    .filter(contact => !this.meeting.contacts.map(c => c.id).includes(contact.id))
            })
            .catch(console.error)
    }
}
</script>

<style scoped>
    .contact-name {
        margin: 0 3px;
        padding: 4px 5px;
        border: 1px solid black;
        border-radius: 15px;
    }
    .contact-names {
        margin-bottom: 2%;
    }
</style>
