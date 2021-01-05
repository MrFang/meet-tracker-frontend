<template>
    <div class="meeting-list">
        <div class="meeting" :key="meeting.id" v-for="meeting in meetings">
            {{ meeting }}
        </div>
    </div>
    <router-link to="/meetings/create"><button class="btn btn-primary">Create</button></router-link>
</template>

<script lang="ts">
import { getMeetingsList } from '@/api/meetings'
import { Meeting } from '@/common/types'
import { Vue } from 'vue-class-component'

export default class MeetingsList extends Vue {
    meetings: Meeting[] = []

    created () {
        getMeetingsList()
            .then((data) => { this.meetings = data || [] })
            .catch(console.error)
    }
}
</script>

<style scoped>
    .meeting-list {
        max-width: 60%;
        margin: 0 auto;
    }
    .meeting {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
