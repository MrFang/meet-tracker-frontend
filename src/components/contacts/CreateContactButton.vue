<template>
    <router-link :to="{name: 'CreateContact'}"><button :class="['btn', 'btn-primary', $attrs.class]">Добавить контакт</button></router-link>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class CreateContactButton extends Vue {

}
</script>

<style scoped>

</style>
