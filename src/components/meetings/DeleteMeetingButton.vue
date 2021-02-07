<template>
    <button class="btn btn-danger" @click="deleteAndRedirect">Удалить встречу</button>
</template>

<script lang="ts">
import { deleteMeeting } from '@/api/meetings'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        meetingId: {
            required: true,
            type: Number
        }
    }
})
export default class DeleteMeetingButton extends Vue {
    private meetingId!: number

    private deleteAndRedirect () {
        deleteMeeting(this.meetingId)
            .then(() => this.$router.push({ name: 'Meetings' }))
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
