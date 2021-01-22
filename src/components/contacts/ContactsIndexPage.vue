<template>
    <template v-if="contacts">
        <List class="list" :items="contacts" :itemTemplate="contactCard"/>
        <CreateContactButton />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import { getContacts } from '@/api/contacts'
import Loader from '@/components/Loader.vue'
import List from '@/components/List.vue'
import ContactCard from '@/components/contacts/ContactCard.vue'
import CreateContactButton from '@/components/contacts/CreateContactButton.vue'

@Options({
    components: {
        Loader,
        List,
        CreateContactButton
    }
})
export default class ContactsIndexPage extends Vue {
    private contacts: Contact[] | null = null
    private contactCard = ContactCard

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
    }
</style>
