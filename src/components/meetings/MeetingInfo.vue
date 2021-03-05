<template>
    <form>
        <div class="row">
            <div class="col-9">
                <div class="row">
                    <div class="form-group col">
                        <input class="form-control" type="text" placeholder="Title" v-model="meeting.title" />
                    </div>
                    <div class="form-froup col">
                        <input class="form-control" type="date" v-model="meeting.date" />
                    </div>
                    <div class="form-group col">
                        <input class="form-control" type="time" v-model="meeting.time" />
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <textarea class="form-control" placeholder="Description"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <textarea class="form-control" placeholder="Notes"></textarea>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>

    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Meeting } from '@/common/types'

@Options({
    props: {
        meeting: Object
    }
})
export default class MeetingInfo extends Vue {
    private meeting!: Meeting
}
</script>

<style scoped>

</style>
