<template>
    <form @submit.prevent="login">
        <div class="form-group">
            <label>Логин</label>
            <input class="form-control" type="text" v-model="username" required />
        </div>
        <div class="form-group">
            <label>Пароль</label>
            <input class="form-control" type="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { login } from '@/api/auth'

export default class LoginPage extends Vue {
    private username = ''
    private password = ''

    private login (): void {
        login(this.username, this.password)
            .then(() => { this.$router.push({ name: 'Meetings' }) })
    }
}
</script>

<style scoped>

</style>
