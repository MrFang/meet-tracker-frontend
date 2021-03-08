<template>
    <GridHeader class="mb-2 mt-2" />
    <div class="row flex-nowrap">
        <div class="col-9 p-0">
            <div class="row mb-2">
                <GridToolPanel v-model:dateString="dateString" />
            </div>
            <MeetingsSchedule
                :weekDates="weekDates"
                :meetingsList="meetingsList"
                @meetingClicked="clickedMeeting = $event"
            />
        </div>
        <div class="col ml-2 border">
            <GridContactList />
        </div>
    </div>
    <AppModal v-if="clickedMeeting">
        <template v-slot:header>
            <h3>{{clickedMeeting.title}}</h3>
        </template>
        <template v-slot:body>
            <MeetingForm v-model:meeting="clickedMeeting" @submit="getMeetings()" />
        </template>
    </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GridToolPanel from './GridToolPanel.vue'
import GridContactList from './GridContactList.vue'
import moment, { Moment } from 'moment'
import { getMeetings, updateMeeting } from '@/api/meetings'
import { Meeting } from '@/common/types'
import AppModal from '@/components/AppModal.vue'
import MeetingForm from '@/components/meetings/EditMeetingForm.vue'
import MeetingsSchedule from './MeetingsSchedule.vue'
import GridHeader from './GridHeader.vue'

@Options({
    components: {
        GridToolPanel,
        GridContactList,
        AppModal,
        MeetingForm,
        MeetingsSchedule,
        GridHeader
    },
    watch: {
        monday (newMonday: Moment, oldMonday: Moment): void {
            if (newMonday.format('YYYY-MM-DD') !== oldMonday.format('YYYY-MM-DD')) {
                this.getMeetings()
            }
        }
    }
})
export default class GridLayout extends Vue {
    private clickedMeeting: Meeting | null = null
    private requestedDay = moment()
    private meetingsList: Meeting[] = []

    created (): void {
        this.getMeetings()
    }

    get monday (): Moment {
        return moment(this.requestedDay).subtract(this.requestedDay.isoWeekday() - 1, 'days')
    }

    get weekDates (): string[] {
        const week = []

        for (let i = 0; i < 7; i++) {
            week.push(
                moment(this.monday)
                    .add(i, 'days')
                    .locale(moment.locale('ru', { weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_') }))
                    .format('dd, DD.MM')
            )
        }

        return week
    }

    get dateString (): string {
        return this.requestedDay.format('YYYY-MM-DD')
    }

    set dateString (newValue: string) {
        this.requestedDay = moment(newValue)
    }

    private getMeetings (): void {
        const mondayDateString = this.monday.format('YYYY-MM-DD')
        const sundayDateString = moment(this.monday).add(6, 'days').format('YYYY-MM-DD')

        getMeetings(mondayDateString, sundayDateString)
            .then((meetings) => {
                this.meetingsList = meetings
            })
    }

    private updateMeeting (meeting: Meeting): void {
        updateMeeting(meeting)
            .then(() => { this.clickedMeeting = null })
    }
}
</script>

<style scoped>
</style>
