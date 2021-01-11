<template>
    <MeetingInfo :meeting="meeting" />
    <EditMeetingButton :meetingId="meeting.id" />
    <DeleteMeetingButton :meetingId="meeting.id" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Meeting } from '@/common/types'
import MeetingInfo from '@/components/meetings/MeetingInfo.vue'
import EditMeetingButton from '@/components/meetings/EditMeetingButton.vue'
import DeleteMeetingButton from '@/components/meetings/DeleteMeetingButton.vue'

@Options({
    components: {
        MeetingInfo,
        EditMeetingButton,
        DeleteMeetingButton
    },
    props: {
        meeting: {
            required: true
        }
    }
})
export default class MeetingCard extends Vue {
    private meeting!: Meeting
}
</script>

<style>

</style>
