<template>
    <ul class="list">
        <li class="item" :key="meeting.id" v-for="meeting in items">
            <router-link :to="{ name: 'MeetingInfo', params: { id: meeting.id } }">{{ meeting }}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { Meeting } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        items: {
            required: true,
            type: Array
        }
    }
})
export default class MeetingsList extends Vue {
    private items!: Meeting[]
}
</script>

<style scoped>
    .list {
        list-style-type: none;
    }
    .item {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
