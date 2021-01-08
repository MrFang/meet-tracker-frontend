<template>
    <div>{{ meeting }}</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'

@Options({
    props: {
        meeting: {
            required: true
        }
    }
})
export default class MeetingInfo extends Vue {
    meeting!: Meeting
}
</script>

<style scoped>

</style>
