<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label>Логин</label>
            <input
                class="form-control" type="text" required
                :value="credentials.username"
                @input="$emit('update:credentials', {...credentials, username: $event.target.value})"
            />
        </div>
        <div class="form-group">
            <label>Пароль</label>
            <input
                class="form-control" type="password" required
                :value="credentials.password"
                @input="$emit('update:credentials', {...credentials, password: $event.target.value})"
            />
        </div>
        <button class="btn btn-primary" type="submit">{{ submitionText }}</button>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { UserCredentials } from '@/common/types'

@Options({
    props: {
        credentials: {
            required: true
        },
        register: {
            required: true,
            type: Boolean
        }
    },
    emits: ['update:credentials', 'submit']
})
export default class CredentialsForm extends Vue {
    private register!: boolean
    private credentials!: UserCredentials

    get submitionText (): string {
        return this.register ? 'Зарегестрироваться' : 'Войти'
    }

    private submit () {
        this.$emit('submit')
    }
}
</script>

<style scoped>

</style>
