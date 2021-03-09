<template>
    <button class="contact" @click="$emit('click', contact)">{{ contact.firstName }} {{contact.secondName}}</button>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contact: {
            required: true,
            type: Object
        }
    },
    emits: ['click']
})
export default class ContactCard extends Vue {
    private contact!: Contact
}
</script>

<style scoped>
    .contact {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: transparent;
    }
</style>
