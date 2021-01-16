<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label>Имя</label>
            <input
                class="form-control" required type="text"
                :value="contact.firstName"
                @input="$emit('update:contact', {...contact, firstName: $event.target.value})"
            />
        </div>
        <div class="form-group">
            <label>Фамилия</label>
            <input class="form-control" type="text"
                :value="contact.secondName"
                @input="$emit('update:contact', {...contact, secondName: $event.target.value || null})"
            />
        </div>
        <div class="form-group">
            <label>Телефон</label>
            <input class="form-control" type="tel"
                :value="contact.telephone"
                @input="$emit('update:contact', {...contact, telephone: $event.target.value || null})"
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contact: {
            required: true
        }
    },
    emits: ['update:contact', 'submit']
})
export default class EditContactForm extends Vue {
    private contact!: Contact

    private submit () {
        this.$emit('submit')
    }
}
</script>

<style scoped>

</style>
