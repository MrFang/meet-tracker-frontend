<template>
    <router-link :to="{ name: 'ContactInfo', params: { id: item.id } }">{{ item }}</router-link>
</template>

<script lang="ts">
import { Contact } from '@/common/types'
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
        item: {
            required: true,
            type: Object
        }
    }
})
export default class ContactCard extends Vue {
    private item!: Contact
}
</script>

<style scoped>

</style>
