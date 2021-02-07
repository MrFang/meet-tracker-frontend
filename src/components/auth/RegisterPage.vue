<template>
    <h1>Регистрация</h1>
    <CredentialsForm v-model:credentials="credentials" register @submit="register"/>
</template>

<script lang="ts">
import { register } from '@/api/auth'
import { Options, Vue } from 'vue-class-component'
import { UserCredentials } from '@/common/types'
import CredentialsForm from '@/components/auth/CredentialsForm.vue'

@Options({
    components: {
        CredentialsForm
    }
})
export default class RegisterPage extends Vue {
    private credentials: UserCredentials = {
        username: '',
        password: ''
    }

    private register () {
        register(this.credentials)
            .then(() => { this.$router.push({ name: 'Login' }) })
    }
}
</script>

<style scoped>

</style>
