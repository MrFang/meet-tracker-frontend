<template>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>

<script>
import { Vue } from 'vue-class-component'
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
