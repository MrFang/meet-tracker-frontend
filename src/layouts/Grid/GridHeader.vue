<template>
  <header class="d-flex justify-content-end"><h3 class="flex-grow-1 ml-1">Meet-tracker</h3><LogoutButton /></header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton.vue'

@Options({
    components: {
        LogoutButton
    }
})
export default class GridHeader extends Vue {

}
</script>

<style scoped>
</style>
