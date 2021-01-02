<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <CreateMeetingPage/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CreateMeetingPage from '@/components/meetings/CreateMeetingPage.vue'

@Options({
    components: {
        CreateMeetingPage
    }
})
export default class Home extends Vue {}
</script>
