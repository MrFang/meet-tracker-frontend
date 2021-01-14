<template>
    <EditMeetingForm v-if="isNew || isFetched" v-model:meeting="meeting" @submit="handleFormSubmit"/>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import EditMeetingForm from '@/components/meetings/EditMeetingForm.vue'
import Loader from '@/components/Loader.vue'
import { Meeting } from '@/common/types'
import { createMeeting, getMeeting, updateMeeting } from '@/api/meetings'

@Options({
    props: {
        meetingId: {
            type: Number
        }
    },
    components: {
        EditMeetingForm,
        Loader
    }
})
export default class EditMeetingPage extends Vue {
    private meetingId!: number
    private meeting: Meeting = {
        title: '',
        date: this.getDateStringFromDate(new Date()),
        time: this.getTimeStringFromDate(new Date())
    }

    private isFetched = false

    get isNew (): boolean {
        return !this.meetingId
    }

    created () {
        if (!this.isNew) {
            getMeeting(this.meetingId)
                .then((data: Meeting) => {
                    this.meeting = data
                    this.isFetched = true
                })
                .catch(console.error)
        }
    }

    private handleFormSubmit (): void {
        if (this.isNew) {
            this.createMeeting()
        } else {
            this.updateMeeting()
        }
    }

    private updateMeeting (): void {
        updateMeeting(this.meeting)
            .then(() => this.$router.push({ name: 'Meetings' }))
            .catch(console.error)
    }

    private createMeeting (): void {
        createMeeting(this.meeting)
            .then(() => this.$router.push({ name: 'Meetings' }))
            // TODO: Display errors
            .catch(console.error)
    }

    private getDateStringFromDate (date: Date): string {
        const day: string = date.getDate() < 10
            ? '0' + date.getDate().toString()
            : date.getDate().toString()
        const month: string = date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString()
        const year: string = date.getFullYear().toString()

        return [year, month, day].join('-')
    }

    private getTimeStringFromDate (date: Date): string {
        const hours: string = date.getHours() < 10
            ? '0' + date.getHours().toString()
            : date.getHours().toString()
        const minutes: string = date.getMinutes() < 10
            ? '0' + date.getMinutes().toString()
            : date.getMinutes().toString()

        return [hours, minutes].join(':')
    }
}
</script>

<style scoped>

</style>
