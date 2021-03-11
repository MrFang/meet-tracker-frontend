<template>
    <div class="m-1">
        <div class="row mb-2">
            <SearchField
                class="form-control d-inline w-75"
                placeholder="Контакт..."
                :suggestedItems="searchSuggestions"
                :displayItem="contact => contact.firstName"
                @inputChange="search($event)"
                @suggestionSelected="$emit('contactClicked', $event)"
            />
            <button class="btn btn-primary ml-1">
                <i class="bi-search"></i>
            </button>
        </div>
        <div class="row">
            <div class="col">
                <template v-if="contacts">
                    <ul class="list-group">
                        <li :key="contact.id" v-for="contact in contacts" class="list-group-item p-1">
                            <ContactCard :contact="contact" @click="$emit('contactClicked', $event)"/>
                        </li>
                    </ul>
                    <button class="btn btn-primary mt-2" @click="$emit('createContact')">Добавить контакт</button>
                </template>
                <Loader v-else />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'
import Loader from '@/components/Loader.vue'
import ContactCard from '@/components/contacts/ContactCard.vue'
import { searchContacts } from '@/api/search'
import SearchField from '@/components/SearchField.vue'

@Options({
    components: {
        Loader,
        ContactCard,
        SearchField
    },
    props: {
        contacts: {
            required: true,
            type: Array
        }
    },
    emits: ['contactClicked', 'createContact']
})
export default class GridContactList extends Vue {
    private contacts!: Contact[]
    private searchSuggestions: Contact[] = []

    private search (searchString: string) {
        searchContacts(searchString)
            .then(result => { this.searchSuggestions = result })
            .catch(console.error)
    }
}
</script>

<style>

</style>
