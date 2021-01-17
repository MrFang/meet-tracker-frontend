<template>
    <template v-if="contact">
        <ContactInfo :contact="contact" />
        <EditContactButton :contactId="contact.id" />
        <DeleteContactButton :contactId="contact.id" />
    </template>
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ContactInfo from '@/components/contacts/ContactInfo.vue'
import Loader from '@/components/Loader.vue'
import DeleteContactButton from '@/components/contacts//DeleteContactButton.vue'
import EditContactButton from '@/components/contacts/EditContactButton.vue'
import { Contact } from '@/common/types'
import { getContact } from '@/api/contacts'

@Options({
    props: {
        contactId: {
            type: Number,
            required: true
        }
    },
    components: {
        ContactInfo,
        EditContactButton,
        DeleteContactButton,
        Loader
    }
})
export default class ContactInfoPage extends Vue {
    private contactId!: number
    private contact: Contact | null = null

    created () {
        getContact(this.contactId)
            .then(data => { this.contact = data })
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
