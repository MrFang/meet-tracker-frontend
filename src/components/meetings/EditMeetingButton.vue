<template>
    <router-link :to="{ name: 'EditMeeting', params: { id: meetingId } }"><button class="btn btn-primary">Edit</button></router-link>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
    props: {
        meetingId: {
            type: Number,
            required: true
        }
    }
})
export default class EditMeetingButton extends Vue {
    private meetingId!: number
}
</script>

<style scoped>

</style>
