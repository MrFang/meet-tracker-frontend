<template>
    <form @submit.prevent="postMeeting">
        <div class="form-group">
            <label>Название</label>
            <input class="form-control" required type="text" v-model="title" />
        </div>
        <div class="form-group">
            <label>Дата</label>
            <input class="form-control" type="date" v-model="date" />
        </div>
        <div class="form-group">
            <label>Время</label>
            <input class="form-control" type="time" v-model="time" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { createMeeting } from '@/api/meetings'

export default class CreateMeetingForm extends Vue {
    private title = ''
    private date: string = this.getDateStringFromDate(new Date())
    private time: string = this.getTimeStringFromDate(new Date())

    private getDateStringFromDate (date: Date): string {
        const day: string = date.getDate() < 10
            ? '0' + date.getDate().toString()
            : date.getDate().toString()
        const month: string = date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString()
        const year: string = date.getFullYear().toString()
        console.log(this.$options)

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

    private postMeeting (): void {
        const datetime: string = this.date + 'T' + this.time
        createMeeting({ title: this.title, datetime })
            .then(() => this.$router.push('/'))
            // TODO: Display errors
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
