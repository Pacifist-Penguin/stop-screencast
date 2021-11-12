<template>
  <div class="textContainer" ref="textArea" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { timeFragment } from '@/types/timeFragment'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/shades-of-purple.css'
import { indexedTimeFragment } from '@/types/indexedTimeFragment'

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
    return {
      currentText: '',
      currentTextHighlighted: '',
      lastId: 0
    }
  },
  computed: {
    currentTimeFrame () {
      const indexOfCurrentFrame = this.timeFrames.findIndex((timeframe) => {
        return timeframe.startTime <= this.currentTime && timeframe.endTime >= this.currentTime
      })
      // clear textbox if there's no frames for this timeFragment
      if (indexOfCurrentFrame === -1) {
        return { timeFragment: { action: 'clean', startTime: 0, endTime: 0, text: '' }, id: indexOfCurrentFrame } as indexedTimeFragment
      } else {
        return { timeFragment: this.timeFrames[indexOfCurrentFrame], id: indexOfCurrentFrame } as indexedTimeFragment
      }
    }
  },
  methods: {
    highlightText (text: string) {
      return '<div>' + hljs.highlight(text, { language: this.languageName }).value + '</div>'
    }
  },
  watch: {
    currentTimeFrame: function (newValue: indexedTimeFragment) {
      const textarea = (this.$refs.textArea as HTMLElement)
      if (newValue.id !== this.lastId) {
        if (newValue.id < this.lastId) {
          textarea.innerHTML = ''
        }
        this.lastId = newValue.id
        switch (this.currentTimeFrame.timeFragment.action) {
          case ('nextSlide'):
            textarea.innerHTML = this.highlightText(newValue.timeFragment.text)
            break
          case ('append'):
            textarea.innerHTML += this.highlightText(newValue.timeFragment.text)
            break
          case ('clean'):
            textarea.innerHTML = ''
            break
        }
      }
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
