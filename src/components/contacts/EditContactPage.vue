<template>
    <EditContactForm v-if="isNew || isFetched" v-model:contact="contact" @submit="handleFormSubmit"/>
    <Loader v-else />
</template>

<script lang="ts">
import { createContact, getContact, updateContact } from '@/api/contacts'
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import EditContactForm from '@/components/contacts/EditContactForm.vue'
import Loader from '@/components/Loader.vue'

@Options({
    props: {
        contactId: {
            type: Number
        }
    },
    components: {
        EditContactForm,
        Loader
    }
})
export default class EditContactPage extends Vue {
    private contactId!: number
    private contact: Contact = {
        firstName: ''
    }

    private isFetched = false
    private isNew = !this.contactId

    created () {
        if (!this.isNew) {
            getContact(this.contactId)
                .then((data: Contact) => {
                    this.contact = data
                    this.isFetched = true
                })
                .catch(console.error)
        }
    }

    private handleFormSubmit (): void {
        if (this.isNew) {
            this.createContact()
        } else {
            this.updateContact()
        }
    }

    private updateContact (): void {
        updateContact(this.contact)
            .then(() => this.$router.push({ name: 'Contacts' }))
            .catch(console.error)
    }

    private createContact (): void {
        createContact(this.contact)
            .then(() => this.$router.push({ name: 'Contacts' }))
            // TODO: Display errors
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
