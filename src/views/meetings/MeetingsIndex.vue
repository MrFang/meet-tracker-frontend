<template>
    <MeetingsList class="meeting-list" />
    <CreateMeetingButton />
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import MeetingsList from '@/components/meetings/MeetingsList.vue'
import CreateMeetingButton from '@/components/meetings/CreateMeetingButton.vue'

@Options({
    components: {
        MeetingsList,
        CreateMeetingButton
    }
})
export default class MeetingsIndex extends Vue {

}
</script>

<style scoped>
    .meeting-list {
        max-width: 60%;
        margin: 0 auto;
    }
</style>
