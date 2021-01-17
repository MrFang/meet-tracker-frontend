<template>
    <div>{{contact}}</div>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contact: {
            required: true
        }
    }
})
export default class ContactInfo extends Vue {
    private contact!: Contact
}
</script>

<style scoped>

</style>
