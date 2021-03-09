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

@Options({
    components: {
        Loader,
        ContactCard
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
}
</script>

<style>

</style>
