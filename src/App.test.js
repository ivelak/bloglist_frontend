import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('does not show any blogs before logging in', () => {
        app.update()
        const blogComponents = app.find(Blog)
        const loginComponents = app.find(LoginForm)
        expect(blogComponents.length).toEqual(0)
        expect(loginComponents.length).toEqual(1)
    })
})