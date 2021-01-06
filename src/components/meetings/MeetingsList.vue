<template>
    <ul class="list">
        <li class="meeting" :key="meeting.id" v-for="meeting in meetings">
            {{ meeting }}
        </li>
    </ul>
</template>

<script lang="ts">
import { getMeetingsList } from '@/api/meetings'
import { Meeting } from '@/common/types'
import { Vue } from 'vue-class-component'

export default class MeetingsList extends Vue {
    meetings: Meeting[] = []

    created () {
        getMeetingsList()
            .then((data: Meeting[]) => { this.meetings = data })
            .catch(console.error)
    }
}
</script>

<style scoped>
    .list {
        list-style-type: none;
    }
    .meeting {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
