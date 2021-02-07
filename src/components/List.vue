<template>
    <ul class="list">
        <li class="item" :key="idx" v-for="(item, idx) in items" @click="$emit('itemClicked', item)">
            <component :is="itemTemplate" :item="item" />
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        items: {
            required: true,
            type: Array
        },
        itemTemplate: {
            required: true,
            type: Function
        }
    },
    emits: ['itemClicked']
})
export default class List extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private items!: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private itemTemplate!: any
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
