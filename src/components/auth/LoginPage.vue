<template>
    <h1>Вход</h1>
    <CredentialsForm v-model:credentials="credentials" @submit="login"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { login } from '@/api/auth'
import { UserCredentials } from '@/common/types'
import CredentialsForm from '@/components/auth/CredentialsForm.vue'

@Options({
    components: {
        CredentialsForm
    }
})
export default class LoginPage extends Vue {
    private credentials: UserCredentials = {
        username: '',
        password: ''
    }

    private login (): void {
        login(this.credentials)
            .then(() => { this.$router.push({ name: 'Meetings' }) })
    }
}
</script>

<style scoped>

</style>
