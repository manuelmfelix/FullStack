import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationSuccess, setNotificationsuccess] = useState('notification')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
      console.log('Use Effect: ',`bearer ${user.token}`)
    }
  }, [])

  //Handle Login/Logout------------------------------------------------

  const handleLogout = () => {
    console.log(window.localStorage)
    window.localStorage.clear()
    setUser(null)
    console.log('Logged Out')
    console.log(window.localStorage)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotificationsuccess('notification')
      setErrorMessage('Successfull login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationsuccess('error')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //Login Form---------------------------------------------------

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  //Blog Form---------------------------------------------------

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <div>
  //     title:
  //       <input
  //         type="text"
  //         value={newTitle}
  //         name="Title"
  //         onChange={({ target }) => setNewTitle(target.value)}
  //       />
  //     </div>
  //     <div>
  //     author:
  //       <input
  //         type="text"
  //         value={newAuthor}
  //         name="Author"
  //         onChange={({ target }) => setNewAuthor(target.value)}
  //       />
  //     </div>
  //     <div>
  //     url:
  //       <input
  //         type="text"
  //         value={newUrl}
  //         name="Url"
  //         onChange={({ target }) => setNewUrl(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>create</button>
  //   </form>
  // )

  //Add Blog---------------------------------------------------

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    // event.preventDefault()
    // const blogObject = {
    //   title: newTitle,
    //   author: newAuthor,
    //   url: newUrl
    // }
    // console.log(blogObject)

    // try {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      // setNewTitle('')
      // setNewAuthor('')
      // setNewUrl('')
      })
    setNotificationsuccess('notification')
    setErrorMessage('Blog added successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // catch (exception) {
  //     setNotificationsuccess('error')
  //     setErrorMessage('The blog could not be added')
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  // }
  // }

  const sortBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type={notificationSuccess} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={notificationSuccess} />
      <h3>{user.username} logged in</h3>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='newblog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortBlogs.map(( blog ) =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App