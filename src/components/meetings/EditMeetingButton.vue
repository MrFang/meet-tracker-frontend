<template>
    <router-link :to="{name: 'CreateMeeting'}"><button class="btn btn-primary">Edit</button></router-link>
</template>

<script>
import { Vue } from 'vue-class-component'
export default class EditMeetingButton extends Vue {}
</script>

<style scoped>

</style>
