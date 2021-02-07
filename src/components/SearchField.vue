<template>
    <input v-bind="$attrs" type="text" @input="onChange"/>
    <List v-if="showSuggested" :items="suggestedItems" :itemTemplate="itemTemplate" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import List from '@/components/List.vue'

@Options({
    props: {
        suggestedItems: {
            required: true,
            type: Array
        },
        itemTemplate: {
            required: true,
            type: Function
        }
    },
    emits: ['inputChange'],
    components: {
        List
    }
})
export default class SearchField extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private suggestedItems!: any[]
    private itemTemplate!: Function

    get showSuggested (): boolean {
        return this.suggestedItems.length > 0
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onChange (event: any) {
        this.$emit('inputChange', event.target.value)
    }
}
</script>

<style scoped>

</style>
