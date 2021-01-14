<template>
    <template v-if="contacts">
        <ContactList class="list" :items="contacts" />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import { getContacts } from '@/api/contacts'
import Loader from '@/components/Loader.vue'
import ContactList from '@/components/contacts/ContactList.vue'

@Options({
    components: {
        Loader,
        ContactList
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
    }
</style>
