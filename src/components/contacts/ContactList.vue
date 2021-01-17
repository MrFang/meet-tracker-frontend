<template>
    <ul class="list">
        <li class="item" :key="contact.id" v-for="contact in items">
            <router-link :to="{ name: 'ContactInfo', params: { id: contact.id } }">{{ contact }}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        items: {
            required: true,
            type: Array
        }
    }
})
export default class ContactList extends Vue {
    private items!: Contact[]
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
