<template>
    <button @click="logout" class="btn btn-danger">Выйти</button>
</template>

<script lang="ts">
import { logout } from '@/api/auth'
import { Vue } from 'vue-class-component'

export default class LogoutButton extends Vue {
    private logout () {
        logout()
            .then(() => { this.$router.push({ name: 'Login' }) })
    }
}
</script>

<style scoped>

</style>
