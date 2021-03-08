<template>
    <div class="col-3">
        <input
            class="form-control"
            type="date"
            :value="dateString"
            @input="$emit('update:dateString', $event.target.value)"
        />
    </div>
    <div class="col-7">
        <input type="text" placeholder="Встреча..." class="mr-1"/>
        <button class="btn btn-primary ml-1"><i class="bi-search"></i></button>
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
export default class GridToolPanel extends Vue {
    private dateString!: string
}
</script>

<style>

</style>
