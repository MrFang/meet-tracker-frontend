<template>
    <router-link :to="{name: 'CreateMeeting'}"><button class="btn btn-primary">Create</button></router-link>
</template>

<script>
import { Vue } from 'vue-class-component'
export default class CreateMeetingButton extends Vue {}
</script>

<style scoped>

</style>
