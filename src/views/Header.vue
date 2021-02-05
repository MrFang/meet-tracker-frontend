<template>
    <div class="d-flex justify-content-center align-items-center">
        <div id="nav">
            <router-link :to="{ name: 'Meetings' }">Meetings</router-link> |
            <router-link :to="{ name: 'Contacts' }">Contacts</router-link>
        </div>
        <LogoutButton />
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton'

@Options({
    components: {
        LogoutButton
    }
})
export default class Header extends Vue {}
</script>

<style scoped>
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.active {
    color: #42b983;
}
</style>
