<template>
    <MeetingCard v-if="meeting" :meeting="meeting" />
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getMeeting } from '@/api/meetings'
import { Meeting } from '@/common/types'
import MeetingCard from '@/components/meetings/MeetingCard.vue'
import Loader from '@/components/Loader.vue'

@Options({
    components: {
        MeetingCard,
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
