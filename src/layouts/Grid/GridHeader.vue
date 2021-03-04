<template>
    <div class="row mb-2">
        <div class="col-2">
            <input
                class="form-control"
                type="date"
                :value="dateString"
                @input="$emit('update:dateString', $event.target.value)"
            />
        </div>
        <div class="col-7">
            <input type="text" />
            <button class="btn btn-primary">Search</button>
        </div>
        <div class="col">
            <LogoutButton />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton.vue'

@Options({
    components: {
        LogoutButton
    },
    props: {
        dateString: {
            type: String,
            required: true
        }
    }
})
export default class GridHeader extends Vue {
    private dateString!: string
}
</script>

<style>

</style>
