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
    <ul v-show="showSuggested" class="w-100 list-group list position-absolute">
        <li
            v-for="item in suggestedItems"
            :key="item.id"
            class="list-group-item p-1 m-1 item"
        >
            <button class="d-block w-100 border-0" @mousedown.left="$emit('suggestionSelected', item)">
                {{displayItem(item)}}
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
        },
        displayItem: {
            required: false,
            type: Function
        }
    },
    emits: ['inputChange', 'suggestionSelected']
})
export default class SearchField extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private displayItem = (item: any) => item
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
        top: 45px;
        z-index: 15;
        display: block;
        background-color: gray;
    }
    .item {
        border: 1px solid gray;
        border-radius: 5px;
    }
    .item > button {
        background-color: transparent;
    }
</style>
