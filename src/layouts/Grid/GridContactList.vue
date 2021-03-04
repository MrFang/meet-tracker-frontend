<template>
    <div class="col ml-2 border">
        <div class="m-1">
            <div class="row mb-2">
                <div class="col-9"><input class="form-control" type="text" /></div>
                <div class="col-3">
                    <button class="col btn btn-primary">
                        <i class="bi-search"></i>
                    </button>
                </div>
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
