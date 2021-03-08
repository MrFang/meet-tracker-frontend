<template>
    <div class="container">
        <router-view/>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue } from 'vue-class-component'

export default class App extends Vue {
    created () {
        moment.updateLocale('ru', { weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_') })
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
