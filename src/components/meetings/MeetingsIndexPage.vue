<template>
    <template v-if="meetings">
        <List class="list" :items="meetings" :itemTemplate="meetingCard"/>
        <CreateMeetingButton />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'
import List from '@/components/List.vue'
import CreateMeetingButton from '@/components/meetings/CreateMeetingButton.vue'
import Loader from '@/components/Loader.vue'
import { getMeetings } from '@/api/meetings'
import MeetingCard from '@/components/meetings/MeetingCard.vue'

@Options({
    components: {
        List,
        CreateMeetingButton,
        Loader
    }
})
export default class MeetingsIndex extends Vue {
    private meetings: Meeting[] | null = null
    private meetingCard = MeetingCard

    created () {
        getMeetings()
            .then((data: Meeting[]) => { this.meetings = data })
            .catch(console.error)
    }
}
</script>

<style scoped>
    .list {
        max-width: 60%;
        margin: 0 auto;
    }
</style>
