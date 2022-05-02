import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('BlogTesting', () => {
  const testBlog = {
    author: 'Manuel Félix',
    title: 'My 100th blog',
    url: 'www.mmsddf100.com',
    likes: 23,
    user: {
      username: 'mmsddf',
      name: 'Manuel Felix',
      id: '1234567890'
    }
  }

  const mockUpdate = jest.fn()

  beforeEach(() => {
    render(<Blog blog={testBlog} />)
  })

  test('Only Blog and Author Rendered', () => {
    const author = screen.queryByText(testBlog.author)
    const title = screen.queryByText(testBlog.title)
    const url = screen.queryByText(testBlog.url)
    const likes = screen.queryByText(testBlog.likes)

    expect(author).toBeDefined()
    expect(title).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('Url and Likes displayed when clicked', () => {
    const showButton = screen.getByText(/view/)
    userEvent.click(showButton)

    const url = screen.queryByText(testBlog.url)
    const likes = screen.queryByText(testBlog.likes)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('clicking like twice calls event handler twice', () => {
    const showButton = screen.getByText(/view/)
    userEvent.click(showButton)

    const likeButton = screen.getByText(/like/)
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })

})


describe('Blog Form Testing', () => {
  const testBlog = {
    author: 'Manuel Félix',
    title: 'My 100th blog',
    url: 'www.mmsddf100.com',
    likes: 23,
    user: {
      username: 'mmsddf',
      name: 'Manuel Felix',
      id: '1234567890'
    }
  }

  const mockAdd = jest.fn()

  beforeEach(() => {
    render(<BlogForm  addBlog={mockAdd} />)
  })

  test('Adding blog with appropiate arguments', () => {
    const showButton = screen.getByText(/newblog/)
    userEvent.click(showButton)

    const title = screen.querySelector('#Title')
    const author = screen.querySelector('#Author')
    const url = screen.querySelector('#Url')

    userEvent.type(title, testBlog.title)
    userEvent.type(author, testBlog.author)
    userEvent.type(url, testBlog.url)
    userEvent.click(screen.getByText(/create/))

    expect(mockAdd.mock.calls).toHaveLength(1)
    expect(mockAdd).toHaveBeenCalledWith(testBlog)
  })
})