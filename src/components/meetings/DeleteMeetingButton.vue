<template>
    <button class="btn btn-danger" @click="deleteAndRedirect">Delete</button>
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
    meetingId!: number

    deleteAndRedirect () {
        deleteMeeting(this.meetingId)
            .then(() => this.$router.push({ name: 'Meetings' }))
    }
}
</script>

<style scoped>

</style>
