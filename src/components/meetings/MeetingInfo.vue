<template>
    <form>
        <div class="row">
            <div class="form-group col">
                <input class="form-control" type="text" placeholder="Title"/>
            </div>
            <div class="form-froup col">
                <input class="form-control" type="date" />
            </div>
            <div class="form-group col">
                <input class="form-control" type="time" />
            </div>
        </div>
        <div class="row">
            <div class="col form-group">
                <textarea class="form-control">Description</textarea>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'

@Options({
    props: {
        meeting: {
            required: true
        }
    }
})
export default class MeetingInfo extends Vue {
    meeting!: Meeting
}
</script>

<style scoped>

</style>
