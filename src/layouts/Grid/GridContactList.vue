<template>
    <div class="m-1">
        <div class="row mb-2">
            <input class="w-75 mr-1" type="text" placeholder="Контакт..."/>
            <button class="btn btn-primary ml-1">
                <i class="bi-search"></i>
            </button>
        </div>
        <div class="row">
            <div class="col">
                <template v-if="contacts">
                    <ul class="list-group">
                        <li :key="contact.id" v-for="contact in contacts" class="list-group-item">
                            <router-link :to="{ name: 'ContactInfo', params: { id: contact.id } }">
                                <ContactCard :contact="contact"/>
                            </router-link>
                        </li>
                    </ul>
                    <CreateContactButton />
                </template>
                <Loader v-else />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getContacts } from '@/api/contacts'
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
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
export default class GridContactList extends Vue {
    private contacts: Contact[] | null = null

    created () {
        getContacts()
            .then(data => { this.contacts = data })
            .catch(console.error)
    }
}
</script>

<style>

</style>
