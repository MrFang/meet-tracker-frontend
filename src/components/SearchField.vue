<template>
    <input
        v-bind="$attrs"
        v-model="searchString"
        type="text"
        @input="$emit('inputChange', $event.target.value)"
    />
    <ul v-if="showSuggested" class="list">
        <li
            v-for="item in suggestedItems"
            :key="item.id"
            class="item"
            @click="$emit('suggestionSelected', item)"
        >
            {{item}}
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        suggestedItems: {
            required: true,
            type: Array
        }
    },
    emits: ['inputChange', 'suggestionSelected']
})
export default class SearchField extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private suggestedItems!: any[]
    private searchString = ''

    get showSuggested (): boolean {
        return this.suggestedItems.length > 0
    }
}
</script>

<style scoped>
    .list {
        list-style-type: none;
    }
    .item {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
