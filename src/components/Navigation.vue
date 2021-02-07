<template>
    <div id="nav">
        <router-link :to="{ name: 'Meetings' }">Встречи</router-link> |
        <router-link :to="{ name: 'Contacts' }">Контакты</router-link>
    </div>
</template>

<script lang ="ts">
import { Vue } from 'vue-class-component'

export default class Navigation extends Vue {}
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
