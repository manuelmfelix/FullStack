Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3003/api/login', credentials)
    .then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })

  // cy.request({
  //   url: 'http://localhost:3003/api/blogs',
  //   method: 'POST',
  //   body: { title: 'Mmsddf', author: 'Manuel Felix', url: 'www.mf.com', likes: 23 },
  //   headers: {
  //     'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
  //   }
  // })

})

Cypress.Commands.add('addblog', () => {
  cy.login({ username: 'mfelix', password: '2332' })
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title: 'Mmsddf', author: 'Manuel Felix', url: 'www.mf.com', likes: 23 },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request({
      url: 'http://localhost:3003/api/users',
      method: 'POST',
      body: {
        username: 'mfelix',
        password: '2332',
        name: 'Manuel Felix'
      }
    })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened and login or is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('log in fails with wrong credentials', function() {
      cy.get('input:first').type('wrong')
      cy.get('input:last').type('23wrong32')
      cy.contains('login').click()
      cy.get('.error').contains(/Wrong username or password/i)
    })
    it('log in successfull', function() {
      cy.get('input:first').type('mfelix')
      cy.get('input:last').type('2332')
      cy.contains('login').click()
      cy.contains('mfelix logged in')
    })
  })
})

describe('When logged in', function() {
  beforeEach(() => {
    cy.login({ username: 'mfelix', password: '2332' })
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title: 'Mmsddf', author: 'Manuel Felix', url: 'www.mf.com', likes: 23 },
      headers: {
        'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
  })

  it('A blog can be created', function() {
    cy.contains('newblog').click()
    cy.get('#Title').type('MFelix test blog')
    cy.get('#Author').type('Manuel Felix')
    cy.get('#Url').type('www.mfelix.com')
    cy.get('form').contains('create').click()
  })

  it('like a blog', function() {
    cy.contains('view').click().parent().contains('like').click()
  })

  it('user can delete his added blogs', function() {
    const deleteblog = this.blogs[0].title
    cy.contains(deleteblog).contains('view').click().parent().contains('delete').click()
    cy.get('html').should('not.contain', deleteblog)
  })

})