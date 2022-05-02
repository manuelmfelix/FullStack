import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const updateLikes = async ( likes ) => {
    await blogService.update({
      ...blog,
      ...likes
    })
  }

  const removeBlog = async ( blog ) => {
    const confirmDeletion = window.confirm(`Do you want to remove "${blog.title}" by ${blog.author}`)
    if(!confirmDeletion) return
    await blogService.deleteBlog(blog)
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}<br/>
        {blog.url}<br/>
        {blog.likes} <button onClick={ () => { updateLikes({ likes:blog.likes+1 }); console.log(blog.likes) } }>like</button><br/>
        {blog.author}
        <button onClick={() => { removeBlog(blog); console.log(`${blog.name} removed`) } }>remove</button>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog