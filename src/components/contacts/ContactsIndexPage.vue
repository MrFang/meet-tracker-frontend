<template>
    <template v-if="contacts">
        <ul class="list">
            <li :key="contact.id" v-for="contact in contacts" class="item">
                <router-link :to="{ name: 'ContactInfo', params: { id: contact.id } }">
                    <ContactCard :contact="contact"/>
                </router-link>
            </li>
        </ul>
        <CreateContactButton />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import { getContacts } from '@/api/contacts'
import Loader from '@/components/Loader.vue'
import ContactCard from '@/components/contacts/ContactCard.vue'
import CreateContactButton from '@/components/contacts/CreateContactButton.vue'

@Options({
    components: {
        Loader,
        CreateContactButton,
        ContactCard
    }
})
export default class ContactsIndexPage extends Vue {
    private contacts: Contact[] | null = null

    created () {
        getContacts()
            .then(data => { this.contacts = data })
            .catch(console.error)
    }
}
</script>

<style scoped>
    .list {
        max-width: 60%;
        margin: 0 auto;
        list-style-type: none;
    }
    .item {
        border: 1px solid gray;
        border-radius: 5px;
        margin: 3px;
    }
</style>
