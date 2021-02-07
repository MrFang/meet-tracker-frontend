<template>
    <input v-bind="$attrs" v-model="searchString" type="text" @input="$emit('inputChange', $event.target.value)"/>
    <List
        v-if="showSuggested"
        :items="suggestedItems"
        :itemTemplate="itemTemplate"
        @itemClicked="$emit('suggestionSelected', $event)"
    />
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
    emits: ['inputChange', 'suggestionSelected'],
    components: {
        List
    }
})
export default class SearchField extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private suggestedItems!: any[]
    private itemTemplate!: Function
    private searchString = ''

    get showSuggested (): boolean {
        return this.suggestedItems.length > 0
    }
}
</script>

<style scoped>

</style>
