<template>
    <template v-if="meeting">
        <MeetingInfo :meeting="meeting" />
        <EditMeetingButton :meetingId="meeting.id" />
        <DeleteMeetingButton :meetingId="meeting.id" />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getMeeting } from '@/api/meetings'
import { Meeting } from '@/common/types'
import MeetingInfo from '@/components/meetings/MeetingInfo.vue'
import EditMeetingButton from '@/components/meetings/EditMeetingButton.vue'
import DeleteMeetingButton from '@/components/meetings/DeleteMeetingButton.vue'
import Loader from '@/components/Loader.vue'

@Options({
    components: {
        MeetingInfo,
        EditMeetingButton,
        DeleteMeetingButton,
        Loader
    },
    props: {
        meetingId: {
            required: true,
            type: Number
        }
    }
})
export default class MeetingInfoPage extends Vue {
    private meetingId!: number
    private meeting: Meeting | null = null

    created () {
        getMeeting(this.meetingId)
            .then((data: Meeting) => { this.meeting = data })
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
