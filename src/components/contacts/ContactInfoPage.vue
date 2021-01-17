<template>
    <ContactInfo v-if="contact" :contact="contact" />
    <Loader v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ContactInfo from '@/components/contacts/ContactInfo.vue'
import Loader from '@/components/Loader.vue'
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
