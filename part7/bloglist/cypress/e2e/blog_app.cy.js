describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    setUpUserPelleWithOneBlog();
    setUpUserAdminWithOneBlog();
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login-username').type('admin');
      cy.get('#login-password').type('root');
      cy.get('#login-submit').click();

      cy.contains('karl anka logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#login-username').type('admin');
      cy.get('#login-password').type('wrong password');
      cy.get('#login-submit').click();

      cy.contains('failed logging in with provided credentials');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#login-username').type('admin');
      cy.get('#login-password').type('root');
      cy.get('#login-submit').click();
    });

    it('A blog can be created', function () {
      cy.get('button').contains('add new blog').click();

      cy.contains('some blog').should('not.exist');
      cy.contains('some author').should('not.exist');

      cy.get('#blogTitle').type('some blog');
      cy.get('#blogAuthor').type('some author');
      cy.get('#blogUrl').type('www.url.com');
      cy.get('#blogSubmit').click();

      cy.contains('some blog');
      cy.contains('some author');
    });

    it('users can like a blog', function () {
      cy.get('.blogItem')
        .contains('pelles blog')
        .within(() => {
          cy.get('button').contains('view').click();
          cy.contains('88');
          cy.get('button').contains('like').click();
          cy.contains('88').should('not.exist');
          cy.contains('89');
        });
    });

    it('user that create a blog can delete it', function () {
      cy.get('.blogItem')
        .contains('my blog')
        .within(() => {
          cy.get('button').contains('view').click();
          cy.contains('my blog');
          cy.get('button').contains('remove').click();
        });
      cy.contains('my blog').should('not.exist');
    });

    it('only creator can see delete button of a blog', function () {
      cy.get('.blogItem')
        .contains('pelles blog')
        .within(() => {
          cy.get('button').contains('view').click();
          cy.get('button').contains('remove').should('not.exist');
        });
    });

    it('blogs are sorted by likes in descending order', function () {
      cy.get('.blogItem').eq(0).should('contain', 'my blog');
      cy.get('.blogItem').eq(1).should('contain', 'pelles blog');

      cy.get('.blogItem')
        .contains('pelles blog')
        .within(() => {
          cy.get('button').contains('view').click();
          cy.get('button').contains('like').click();
          cy.get('button').contains('like').click();
        });

      cy.get('.blogItem').eq(0).should('contain', 'pelles blog');
      cy.get('.blogItem').eq(1).should('contain', 'my blog');
    });
  });
});

function setUpUserPelleWithOneBlog() {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username: 'pelle',
    password: 'ellep',
    name: 'pelle ponny',
  });
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: 'pelle',
    password: 'ellep',
  }).then((response) => {
    let token = response.body.token;
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      headers: { authorization: `Bearer ${token}` },
      body: {
        title: 'pelles blog',
        author: 'pelles author',
        url: 'www.example.com',
        likes: 88,
      },
    });
  });
}

function setUpUserAdminWithOneBlog() {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username: 'admin',
    password: 'root',
    name: 'karl anka',
  });

  cy.request('POST', 'http://localhost:3003/api/login', {
    username: 'admin',
    password: 'root',
  }).then((response) => {
    let token = response.body.token;
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      headers: { authorization: `Bearer ${token}` },
      body: {
        title: 'my blog',
        author: 'my author',
        url: 'www.example.com',
        likes: 89,
      },
    });
  });
}
