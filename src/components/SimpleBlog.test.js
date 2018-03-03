import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
        const blog = {
            title: 'testiotsikko',
            author: 'testikirjoittaja',
            likes: 5
        }
        const blogComponent = shallow(<SimpleBlog blog={blog}/>)
        const titleDiv = blogComponent.find('.title')
        const likesDiv = blogComponent.find('.likes')

        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
        expect(likesDiv.text()).toContain(blog.likes)
    })
})
