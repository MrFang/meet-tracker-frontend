<template>
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
                    v-for="i in 24"
                    :key="i"
                    class="position-absolute"
                    :style="{ top: String(HOUR_HEIGHT_PX*i) + 'px' }"
                >
                    {{ (i-1) === 0 ? '' : (i-1) }}
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
                        :style="{
                            top: computeMeetingPositionInPx(meeting),
                            minHeight: String(meeting.duration / 60 * HOUR_HEIGHT_PX) + 'px',
                            maxHeight: String(meeting.duration / 60 * HOUR_HEIGHT_PX) + 'px',
                        }"
                        @click="$emit('meetingClicked', meeting)"
                    >
                        {{ meeting.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Meeting } from '@/common/types'
import moment from 'moment'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        weekDates: {
            required: true,
            type: Array
        },
        meetingsList: {
            required: true,
            type: Array
        }
    },
    emits: ['meetingClicked']
})
export default class MeetingSchedule extends Vue {
    private weekDates!: string[]
    private meetingsList!: Meeting[]
    private HOUR_HEIGHT_PX = 50
    private SECONDS_IN_HOUR = 60 * 60

    get meetingsSchedule (): Meeting[][] {
        const schedule: Meeting[][] = this.weekDates.map(() => [])

        this.meetingsList.forEach((meeting) => {
            schedule[moment(meeting.startDate).isoWeekday() - 1].push(meeting)
        })

        return schedule
    }

    private computeMeetingPositionInPx (meeting: Meeting): string {
        const secondsFromDayStart = moment(`${meeting.startDate}T${meeting.startTime}`, 'YYYY-MM-DDThh:mm').unix() - moment(meeting.startDate).unix()
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
        background-color: cornflowerblue;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
</style>
