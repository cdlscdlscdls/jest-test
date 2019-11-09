import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom/extend-expect'

import App from '../App.vue'

describe('App.vue', () => {
  test('render property', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toContain('<img alt="Vue logo" src="./assets/logo.png">')
  })
})