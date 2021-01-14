<template>
    <template v-if="meetings">
        <MeetingsList class="list" :items="meetings"/>
        <CreateMeetingButton />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'
import MeetingsList from '@/components/meetings/MeetingsList.vue'
import CreateMeetingButton from '@/components/meetings/CreateMeetingButton.vue'
import Loader from '@/components/Loader.vue'
import { getMeetings } from '@/api/meetings'

@Options({
    components: {
        MeetingsList,
        CreateMeetingButton,
        Loader
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
    }
</style>
