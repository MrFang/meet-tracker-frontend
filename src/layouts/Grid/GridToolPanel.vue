<template>
    <div class="col-4">
        <input
            class="form-control d-inline w-auto"
            type="date"
            :value="dateString"
            @input="$emit('update:dateString', $event.target.value)"
        />
        <button
            class="btn btn-primary ml-1"
            @click="resetDate"
        >
            Сегодня
        </button>
    </div>
    <div class="col">
        <button class="btn btn-primary" @click="$emit('createMeeting')">Создать встречу</button>
    </div>
    <div class="col-5">
        <SearchField
                class="form-control d-inline w-75"
                placeholder="Встреча..."
                :suggestedItems="searchSuggestions"
                :displayItem="meeting => meeting.title"
                @inputChange="search($event)"
                @suggestionSelected="$emit('meetingClicked', $event)"
        />
        <button class="btn btn-primary ml-1"><i class="bi-search"></i></button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LogoutButton from '@/components/auth/LogoutButton.vue'
import moment from 'moment'
import { Meeting } from '@/common/types'
import { searchMeetings } from '@/api/search'
import SearchField from '@/components/SearchField.vue'

@Options({
    components: {
        LogoutButton,
        SearchField
    },
    props: {
        dateString: {
            type: String,
            required: true
        }
    },
    emits: ['update:dateString', 'createMeeting', 'meetingClicked']
})
export default class GridToolPanel extends Vue {
    private dateString!: string
    private searchSuggestions: Meeting[] = []

    private resetDate () {
        this.$emit('update:dateString', moment().format('YYYY-MM-DD'))
    }

    private search (searchString: string) {
        searchMeetings(searchString)
            .then(result => { this.searchSuggestions = result })
            .catch(console.error)
    }
}
</script>

<style>

</style>
