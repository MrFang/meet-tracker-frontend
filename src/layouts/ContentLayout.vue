<template>
    <Header />
    <router-view></router-view>
</template>

<script tang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Header'

@Options({
    components: {
        Header
    }
})
export default class ContentLayout extends Vue {}
</script>

<style>

</style>
