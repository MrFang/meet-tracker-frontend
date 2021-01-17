<template>
    <button class="btn btn-danger" @click="deleteAndRedirect">Delete</button>
</template>

<script lang="ts">
import { deleteContact } from '@/api/contacts'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contactId: {
            type: Number,
            required: true
        }
    }
})
export default class DeleteContactButton extends Vue {
    private contactId!: number

    private deleteAndRedirect () {
        deleteContact(this.contactId)
            .then(resp => this.$router.push({ name: 'Contacts' }))
            .catch(console.error)
    }
}
</script>

<style scoped>

</style>
