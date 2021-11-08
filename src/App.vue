<template>
    <text-box :current-time="currentTime" :language-name="'css'" :time-frames="timeframes" />
    <audio class="audio" @timeupdate="setCurrentTime" controls>
      <source src="./assets/audiofile.mp3" type="audio/mpeg" />
    </audio>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import TextBox from './components/TextBox.vue'
import { timeFragment } from './types/timeFragment'

export default defineComponent({
  name: 'App',
  components: {
    TextBox
  },
  data () {
    return {
      counter: 0,
      timeframes: [{
        action: 'nextSlide', startTime: 1, endTime: 6, text: `
      .firstClass {
        display: none
      }
      `
      },
      {
        action: 'append',
        startTime: 6,
        endTime: 12,
        text: `
        .secondClass {
          display: flex
        }
        `
      },
      { action: 'nextSlide', startTime: 12, endTime: 18, text: '.cssZalupa {display: block}' }] as timeFragment[],
      currentTime: 0
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCurrentTime (payload: any) {
      this.currentTime = Math.floor(payload.target.currentTime)
    }
  }
})
</script>

<style>
body {
  width: 100vw;
  margin: 0px;
  background-color: #1E1E3F;
}
.audio {
  margin-top: 2vh;
  bottom: 0;
  display: flex;
  width: 100%;
}
</style>
