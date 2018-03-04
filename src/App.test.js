import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import login from './services/login';

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        it('only login form is rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginComponents = app.find(LoginForm)
            expect(blogComponents.length).toEqual(0)
            expect(loginComponents.length).toEqual(1)
        })
    })
    describe('when user is logged in', () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        beforeEach(() => {
            app = mount(<App />)
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        })
        it('all blogs are rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)

            expect(blogComponents.length).toEqual(blogService.blogs.length)
        })
    })


})