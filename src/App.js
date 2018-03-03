import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      messagetype: null,
      username: '',
      password: '',
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  logout = (event) => {
    event.preventDefault
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({ user: null })
      console.log('ulos')
    } catch (exception) {
      this.setState({
        message: 'ei ees ulos päästä',
        messagetype: 'nega'

      })
      setTimeout(() => {
        this.setState({ message: null, messagetype: null })
      }, 5000)
    }


  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      console.log('sisään')
    } catch (exception) {
      this.setState({
        message: 'käyttäjätunnus tai salasana virheellinen',
        messagetype: 'nega'
      })
      setTimeout(() => {
        this.setState({ message: null, messagetype: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      user: this.state.user._id
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newAuthor: '',
          newTitle: '',
          newUrl: '',
          message: 'a new blog ' + newBlog.title + ' by ' + newBlog.author + ' added ',
          messagetype: 'posi'
        })
      })
    setTimeout(() => {
      this.setState({ message: null, messagetype: null })
    }, 5000)
  }

  addLike = (id) => {
    return () => {
      console.log('addLike',id)
      const blog = this.state.blogs.find(n => n._id === id)
      console.log('blog', blog._id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      console.log('then', changedBlog._id)
      blogService
        .update(id, changedBlog)
        .then(changedBlog => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog._id !== id ? blog : changedBlog)
          })
         
        })
        .catch(error => {
          this.setState({
            message: `blog '${blog.title}' on jotenkin hävinnyt palvelimelta`,
            messagetype: 'nega',
            blogs: this.state.blogs.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({ message: null, messagetype: null })
          }, 50000)
        })
    }
  }

  render() {



    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const blogForm = () => (
      <div>
        <div>
          <h2>add a new blog</h2>
          <form onSubmit={this.addBlog}>
            <div>
              title
            <input
                type="text"
                name="newTitle"
                value={this.state.newTitle}
                onChange={this.handleBlogChange}
              />
            </div>
            <div>
              author
            <input
                type="text"
                name="newAuthor"
                value={this.state.newAuthor}
                onChange={this.handleBlogChange}
              />
            </div>
            <div>
              url
            <input
                type="text"
                name="newUrl"
                value={this.state.newUrl}
                onChange={this.handleBlogChange}
              />
            </div>
            <button>tallenna</button>
          </form>
        </div>
        <div>
          <h2>blogs</h2>
          <ul>
            {
              this.state.blogs.map(blog =>
                <Blog key={blog._id} blog={blog} like={this.addLike(blog._id)} />
              )
            }
          </ul>
        </div >
      </div >
    )
    return (
      <div>
        <h2>blogs</h2>

        <Notification message={this.state.message} type={this.state.messagetype} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>ulos</button></p>


            <div>
              {blogForm()}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
