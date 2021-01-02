<template>
    <form v-on:submit.prevent="postMeeting">
        <input required type="text" v-model="title" />
        <input type="date" v-model="date" />
        <input type="time" v-model="time" />
        <input type="submit" value="submit" />
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'
import { inject } from 'vue'

@Options({
    // TODO: Разобраться как работает этот inject
    // inject: ['API_URL']
})
export default class CreateMeetingPage extends Vue {
    private title = ''
    private date = this.getDateStringFromDate(new Date())
    private time = this.getTimeStringFromDate(new Date())
    private API_URL = inject('API_URL')

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

        console.log(hours, minutes)

        return [hours, minutes].join(':')
    }

    private postMeeting () {
        const datetime: string = this.date + 'T' + this.time
        axios.post(
            `${this.API_URL}/meetings/create`,
            {
                title: this.title,
                datetime
            }
        )
            .then(console.log)
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
