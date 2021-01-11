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
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        meeting: {
            required: true
        }
    },
    emits: ['update:meeting', 'submit']
})
export default class EditMeetingForm extends Vue {
    private submit () {
        this.$emit('submit')
    }
}
</script>

<style scoped>

</style>
