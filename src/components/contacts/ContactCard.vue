<template>
    {{ contact }}
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        contact: {
            required: true,
            type: Object
        }
    }
})
export default class ContactCard extends Vue {
    private contact!: Contact
}
</script>

<style scoped>

</style>
