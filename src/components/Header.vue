<template>
    <div class="d-flex justify-content-center align-items-center">
        <Navigation />
        <LogoutButton />
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton'
import Navigation from '@/components/Navigation'

@Options({
    components: {
        Navigation,
        LogoutButton
    }
})
export default class Header extends Vue {}
</script>

<style scoped>

</style>
