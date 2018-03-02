import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      newTitle:'',
      newAuthor:'',
      newUrl:''
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
        error: 'ei ees ulos päästä',
      })
      setTimeout(() => {
        this.setState({ error: null })
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
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
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
          newUrl:''
        })
      })
  }

  render() {


    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
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
          {
            this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} />

            )
          }
        </div >
      </div >
    )
    return (
      <div>
        <h2>blogs</h2>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>ulos</button></p>
            {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
