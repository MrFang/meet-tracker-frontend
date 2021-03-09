<template>
    <input
        v-bind="$attrs"
        v-model="searchString"
        type="text"
        :placeholder="$attrs.placeholder"
        @input="$emit('inputChange', $event.target.value)"
        @focus="inputFocused = true"
        @blur="inputFocused = false"
    />
    <ul v-if="showSuggested" class="list">
        <li
            v-for="item in suggestedItems"
            :key="item.id"
            class="item"
        >
            <button @mousedown.left="$emit('suggestionSelected', item)">
                {{item}}
            </button>
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
    private inputFocused = false

    get showSuggested (): boolean {
        return this.suggestedItems.length > 0 && this.inputFocused
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
    .item > button {
        display: block;
        width: 100%;
        border: 0;
        background-color: transparent;
    }
</style>
