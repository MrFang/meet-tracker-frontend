<template>
    <form  @submit.prevent="register">
        <div class="form-group">
            <label>Username</label>
            <input class="form-control" type="text" v-model="username" required />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input class="form-control" type="password" v-model="password" required />
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
</template>

<script lang="ts">
import { register } from '@/api/auth'
import { Vue } from 'vue-class-component'

export default class RegisterPage extends Vue {
    private username = ''
    private password = ''

    private register () {
        register(this.username, this.password)
            .then(() => { this.$router.push({ name: 'Login' }) })
    }
}
</script>

<style scoped>

</style>
