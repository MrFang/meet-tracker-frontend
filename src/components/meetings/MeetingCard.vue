<template>
    <EditMeetingButton />
    <MeetingInfo :meeting="meeting" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Meeting } from '@/common/types'
import { getMeeting } from '@/api/meetings'
import MeetingInfo from '@/components/meetings/MeetingInfo.vue'
import EditMeetingButton from '@/components/meetings/EditMeetingButton.vue'

@Options({
    components: {
        MeetingInfo,
        EditMeetingButton
    },
    props: {
        meetingId: {
            required: true,
            type: Number
        }
    }
})
export default class MeetingCard extends Vue {
    meetingId!: number
    meeting: Meeting | null = null

    created () {
        getMeeting(this.meetingId)
            .then((data: Meeting) => { this.meeting = data })
            .catch(console.error)
    }
}
</script>

<style>

</style>
