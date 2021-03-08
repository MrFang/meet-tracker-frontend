<template>
    <div>{{meeting}}</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'

@Options({
    props: {
        meeting: Object
    }
})
export default class MeetingInfo extends Vue {
    private meeting!: Meeting
}
</script>

<style scoped>

</style>
