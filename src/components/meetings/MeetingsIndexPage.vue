<template>
    <template v-if="meetings">
        <ul class="list">
            <li :key="meeting.id" v-for="meeting in meetings" class="item"><MeetingCard :item="meeting"/></li>
        </ul>
        <CreateMeetingButton />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'
import CreateMeetingButton from '@/components/meetings/CreateMeetingButton.vue'
import Loader from '@/components/Loader.vue'
import { getMeetings } from '@/api/meetings'
import MeetingCard from '@/components/meetings/MeetingCard.vue'

@Options({
    components: {
        CreateMeetingButton,
        Loader,
        MeetingCard
    }
})
export default class MeetingsIndex extends Vue {
    private meetings: Meeting[] | null = null

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
        list-style-type: none;
    }
    .item {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
