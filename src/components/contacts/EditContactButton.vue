<template>
    <router-link :to="{ name: 'EditContact', params: { id: contactId } }"><button class="btn btn-primary">Изменить контакт</button></router-link>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contactId: {
            type: Number,
            required: true
        }
    }
})
export default class EditContactButton extends Vue {
    private contactId!: number
}
</script>

<style scoped>

</style>
