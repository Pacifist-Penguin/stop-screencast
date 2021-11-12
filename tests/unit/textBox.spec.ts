import { mount } from '@vue/test-utils'
import TextBoxVue from '@/components/TextBox.vue'
import { timeFragment } from '@/types/timeFragment'
const commonProps = {
  currentTime: 0,
  timeFrames: [
    {
      action: 'append',
      startTime: 2,
      endTime: 6,
      text:
`.firstClass {
display: none
}`
    },
    {
      action: 'append',
      startTime: 6,
      endTime: 12,
      text:
`.secondClass { 
display: flex
}`
    },
    {
      action: 'nextSlide',
      startTime: 12,
      endTime: 18,
      text: '.thirdClass {display: block}'
    }
  ] as timeFragment[],
  languageName: 'css'
}

test('renders textBox', () => {
  const wrapper = mount(TextBoxVue, {
    props: {
      ...commonProps
    }
  })
  expect(wrapper.text()).toBe('')
})
async function frameTest (expectedHTML:string, lastFrameOfTest:timeFragment) {
  const wrapper = mount(TextBoxVue, {
    props: {
      ...commonProps
    }
  })
  let time = 0
  while (time < lastFrameOfTest.endTime) {
    time += 0.25
    await wrapper.setProps({ currentTime: time })
  }
  const compositonAuthor = wrapper.find('.textContainer')
  // removes whitespaces for further comparison
  const minfiedRecievedHTML = compositonAuthor.html().replace(/\s+/g, ' ').trim()
  expect(minfiedRecievedHTML).toContain(expectedHTML)
}
test('waits until the third timeframe and displays the result', async () => {
  return await frameTest('<div class="textContainer"><div><span class="hljs-selector-class">.thirdClass</span> {<span class="hljs-attribute">display</span>: block}</div></div>',
    commonProps.timeFrames[commonProps.timeFrames.length - 1])
})

test('waits until the second timeframe and displays the result', async () => {
  return await frameTest('<div class="textContainer"><div><span class="hljs-selector-class">.firstClass</span> { <span class="hljs-attribute">display</span>: none }</div><div><span class="hljs-selector-class">.secondClass</span> { <span class="hljs-attribute">display</span>: flex }</div></div>',
    commonProps.timeFrames[commonProps.timeFrames.length - 2])
})
