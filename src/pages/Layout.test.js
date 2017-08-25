import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from './Layout'

describe('Layout Component', () => {
  let props, subject

  const setup = (passedProps = {}) => {
    const defaultProps = {}

    props = {...defaultProps, ...passedProps}
    subject = shallow(<Layout {...props} />)
  }

  beforeEach(() => {
    setup()
  })

  it('is defined', () => {
    expect(subject).toBeDefined()
  })

  describe('when not logged in', () => {
    beforeEach(() => {
      setup({
        loggedIn: false
      })
    })

    it('renders routes', () => {
      expect(subject.find('Route').length).toBe(2)
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      setup({
        loggedIn: true
      })
    })

    it('has default classes', () => {
      expect(subject.hasClass('ant-layout-has-sider')).toBe(true)
      expect(subject.hasClass('window-height')).toBe(true)
      expect(subject.hasClass('theme-dark')).toBe(true)
    })

    it('renders flash messages', () => {
      expect(subject.find('Connect(FlashMessages)').exists()).toBe(true)
    })

    it('renders routes', () => {
      expect(subject.find('Route').length).toBe(8)
    })
  })
})
