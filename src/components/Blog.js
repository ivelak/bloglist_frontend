import React from 'react'
import ShowBlog from './ShowBlog'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog, like, remove }) => (

  < ShowBlog label={blog.title} >
    <div style={blogStyle}>
      <ul>
        <li>{blog.author}</li>
        <li>{blog.url}</li>
        <li>likes {blog.likes} <button onClick={like}>like</button></li>
        <li>added by {blog.user.name}</li>
        <li><button onClick={remove}>delete</button></li>
      </ul>
    </div>
  </ShowBlog >
)

export default Blog

