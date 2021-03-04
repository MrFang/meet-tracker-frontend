<template>
    <GridHeader v-model:dateString="dateString" />
    <div class="row flex-nowrap">
        <div class="col-9 p-0">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <div>&NonBreakingSpace; &NonBreakingSpace; &NonBreakingSpace;</div>
                    <div
                        v-for="(date, idx) in weekDates"
                        :key="idx"
                        :class="['flex-grow-1', 'border-right', idx === 0 ? 'border-left' : '']"
                    >
                        {{ date }}
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <div
                            v-for="i in 24"
                            :key="i"
                            class="hr"
                            :style="{ height: String(HOUR_HEIGHT_PX) + 'px' }"
                        ></div>
                    </div>
                    <div>
                        <div>&NonBreakingSpace; &NonBreakingSpace; &NonBreakingSpace;</div>
                        <div
                            v-for="i in 23"
                            :key="i"
                            class="position-absolute"
                            :style="{ top: String(HOUR_HEIGHT_PX*i) + 'px' }"
                        >
                            {{ i }}
                        </div>
                    </div>
                    <div
                        v-for="(day, idx) in meetingsSchedule"
                        :key="idx"
                        :class="['flex-grow-1', 'border-right', idx === 0 ? 'border-left' : '']"
                    >
                        <div class="w-100 h-100 position-relative">
                            <div
                                v-for="(meeting, idx) in day"
                                :key="idx"
                                class="border position-absolute w-100 meeting"
                                :style="{ top: computeMeetingPositionInPx(meeting) }"
                            >
                                <button @click="clickedMeeting = meeting">
                                    {{ meeting.title }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GridContactList />
    </div>
    <AppModal v-show="clickedMeeting" @close="clickedMeeting = null">
        <template v-slot:body>
            <MeetingInfo />
        </template>
    </AppModal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GridHeader from './GridHeader.vue'
import GridContactList from './GridContactList.vue'
import moment, { Moment } from 'moment'
import { getMeetings } from '@/api/meetings'
import { Meeting } from '@/common/types'
import AppModal from '@/components/AppModal.vue'
import MeetingInfo from '@/components/meetings/MeetingInfo.vue'

@Options({
    components: {
        GridHeader,
        GridContactList,
        AppModal,
        MeetingInfo
    },
    watch: {
        monday (newMonday: Moment, oldMonday: Moment) {
            if (newMonday.format('YYYY-MM-DD') !== oldMonday.format('YYYY-MM-DD')) {
                this.getMeetings()
            }
        }
    }
})
export default class GridLayout extends Vue {
    private HOUR_HEIGHT_PX = 50
    private SECONDS_IN_HOUR = 60 * 60
    private clickedMeeting: Meeting | null = null

    private requestedDay = moment()

    private meetingsList: Meeting[] = []

    get monday (): Moment {
        return moment(this.requestedDay).subtract(this.requestedDay.isoWeekday() - 1, 'days')
    }

    get weekDates (): string[] {
        const week = []

        for (let i = 0; i < 7; i++) {
            week.push(moment(this.monday).add(i, 'days').format('DD'))
        }

        return week
    }

    get dateString (): string {
        return this.requestedDay.format('YYYY-MM-DD')
    }

    set dateString (newValue: string) {
        this.requestedDay = moment(newValue)
    }

    get meetingsSchedule (): Meeting[][] {
        const schedule: Meeting[][] = this.weekDates.map(() => [])

        this.meetingsList.forEach((meeting) => {
            schedule[moment(meeting.date).isoWeekday() - 1].push(meeting)
        })

        return schedule
    }

    created () {
        this.getMeetings()
    }

    private getMeetings () {
        const mondayDateString = this.monday.format('YYYY-MM-DD')
        const sundayDateString = moment(this.monday).add(6, 'days').format('YYYY-MM-DD')

        getMeetings(mondayDateString, sundayDateString)
            .then((meetings) => {
                this.meetingsList = meetings
            })
    }

    private computeMeetingPositionInPx (meeting: Meeting): string {
        const secondsFromDayStart = moment(`${meeting.date}T${meeting.time}`, 'YYYY-MM-DDThh:mm').unix() - moment(meeting.date).unix()
        const meetingHour = secondsFromDayStart / this.SECONDS_IN_HOUR

        return String(meetingHour * this.HOUR_HEIGHT_PX) + 'px'
    }
}
</script>

<style scoped>
    .hr::after {
        position: absolute;
        width: 100%;
        content: '';
        border-bottom: 1px solid gray;
    }
    .meeting {
        background-color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 30px;
    }
    .meeting > button {
        border: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
</style>
