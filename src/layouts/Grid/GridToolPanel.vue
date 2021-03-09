<template>
    <div class="col-4">
        <input
            class="form-control d-inline w-auto"
            type="date"
            :value="dateString"
            @input="$emit('update:dateString', $event.target.value)"
        />
        <button
            class="btn btn-secondary ml-1"
            @click="resetDate"
        >
            Сегодня
        </button>
    </div>
    <div class="col">
        <button class="btn btn-primary" @click="$emit('createMeeting')">Создать встречу</button>
    </div>
    <div class="col-5">
        <input type="text" placeholder="Встреча..." class="form-control d-inline w-auto"/>
        <button class="btn btn-primary ml-1"><i class="bi-search"></i></button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton.vue'
import moment from 'moment'

@Options({
    components: {
        LogoutButton
    },
    props: {
        dateString: {
            type: String,
            required: true
        }
    },
    emits: ['update:dateString', 'createMeeting']
})
export default class GridToolPanel extends Vue {
    private dateString!: string

    private resetDate () {
        this.$emit('update:dateString', moment().format('YYYY-MM-DD'))
    }
}
</script>

<style>

</style>
