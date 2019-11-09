import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('render property', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {msg:'HelloWorld'}
    })
    expect(wrapper.text()).toContain('HelloWorld')
  })
})