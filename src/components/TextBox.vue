<template>
  <div class="textContainer" ref="textArea" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { timeFragment } from '@/types/timeFragment'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/shades-of-purple.css'

export default defineComponent({
  name: 'TextBox',
  mounted () {
    // i couldn't imagine how to get over it other way
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const registeredLanguage = require(`highlight.js/lib/languages/${this.languageName}`)
    hljs.registerLanguage(this.languageName, registeredLanguage)
  },
  props: {
    timeFrames: {
      type: Array as PropType<timeFragment[]>,
      required: true
    },
    currentTime: {
      type: Number,
      required: false,
      default: 0
    },
    languageName: {
      type: String,
      required: true,
      default: 'css'
    }
  },
  data () {
    return { currentText: '' }
  },
  computed: {
    currentTextHighlighted () {
      return hljs.highlight(this.currentText, { language: this.languageName }).value
    },
    currentTimeFrame () {
      const indexOfCurrentFrame = this.timeFrames.findIndex((timeframe) => {
        return timeframe.startTime <= this.currentTime && timeframe.endTime >= this.currentTime
      })
      if (indexOfCurrentFrame === -1) {
        return { action: 'clean', startTime: 0, endTime: 0, text: '' }
      } else {
        return this.timeFrames[indexOfCurrentFrame]
      }
    }
  },
  methods: {
    nextSlide (newVal: timeFragment) {
      this.currentText = newVal.text
    },
    append (newVal: timeFragment) {
      this.currentText += newVal.text
    },
    clean () {
      this.currentText = ''
    },
    renderHighlightedText () {
      (this.$refs.textArea as any).innerHTML = this.currentTextHighlighted
    }
  },
  watch: {
    currentTimeFrame: function (newValue: timeFragment) {
      switch (this.currentTimeFrame.action) {
        case ('nextSlide'):
          this.nextSlide(newValue)
          break
        case ('append'):
          this.append(newValue)
          break
        case ('clean'):
          this.clean()
          break
      }
      this.renderHighlightedText()
    }
  }
})
</script>

<style scoped>
.textContainer {
  background-color: #2D2B55;
  width: 90%;
  height: 85vh;
  padding-top: 2.5vh;
  padding-left: 2.5%;
  padding-right: 2.5%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5vh;
  border-radius: 1vmin;
  color: #FAD000;
  white-space: break-spaces;
}
</style>
