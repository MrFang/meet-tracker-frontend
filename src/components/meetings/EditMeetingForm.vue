<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label>Название</label>
            <input
                class="form-control" required type="text"
                :value="meeting.title"
                @input="$emit('update:meeting', {...meeting, title: $event.target.value})"
            />
        </div>
        <div class="form-group">
            <label>Дата</label>
            <input class="form-control" type="date"
                :value="meeting.date"
                @input="$emit('update:meeting', {...meeting, date: $event.target.value})"
            />
        </div>
        <div class="form-group">
            <label>Время</label>
            <input class="form-control" type="time"
                :value="meeting.time"
                @input="$emit('update:meeting', {...meeting, time: $event.target.value})"
            />
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
        <button type="submit" class="btn btn-primary">Сохранить</button>
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
    emits: ['update:meeting', 'submit'],
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

    private submit () {
        this.$emit('submit')
    }

    private participantInputChange (newValue: string) {
        this.search(newValue)
    }

    private addContact (item: Contact) {
        this.meeting.contacts!.push(item)
        this.suggestedParticipants = this.suggestedParticipants
            .filter((parcipiant) => parcipiant.id !== item.id)
        this.$emit('update:meeting', this.meeting)
    }

    private removeContact (item: Contact) {
        this.meeting.contacts = this.meeting.contacts!.filter(contact => contact.id !== item.id)
        this.suggestedParticipants.push(item)
        this.$emit('update:meeting', this.meeting)
    }

    private search (searchString: string) {
        searchContacts(searchString)
            .then(result => {
                this.suggestedParticipants = result
                    .filter(contact => !this.meeting.contacts!.map(c => c.id).includes(contact.id))
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
