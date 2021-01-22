<template>
    <router-link :to="{ name: 'MeetingInfo', params: { id: item.id } }">{{ item }}</router-link>
</template>

<script lang="ts">
import { Meeting } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        item: {
            required: true,
            type: Object
        }
    }
})
export default class MeetingCard extends Vue {
    private item!: Meeting
}
</script>

<style scoped>

</style>
