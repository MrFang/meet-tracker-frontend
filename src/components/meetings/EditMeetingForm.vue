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
            <SearchField
                class="form-control"
                :suggestedItems="suggestedParticipants"
                :itemTemplate="contactCard"
                @inputChange="participantInputChange"
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
import ContactCard from '@/components/contacts/ContactCard.vue'

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
    private contactCard = ContactCard

    private submit () {
        this.$emit('submit')
    }

    private participantInputChange (newValue: string) {
        searchContacts(newValue)
            .then(result => { this.suggestedParticipants = result })
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
