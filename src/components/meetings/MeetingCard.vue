<template>
    {{ meeting }}
</template>

<script lang="ts">
import { Meeting } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        meeting: {
            required: true,
            type: Object
        }
    }
})
export default class MeetingCard extends Vue {
    private meeting!: Meeting
}
</script>

<style scoped>

</style>
