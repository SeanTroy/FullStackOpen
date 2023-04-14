describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Permanent User',
			username: 'permanentuser',
			password: 'permanent'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('login form is shown', function () {
		cy.contains('Log in to application:')
		cy.contains('username:')
		cy.contains('password:')
		cy.contains('login')
	})

	it('user can login', function () {
		cy.get('#username').type('permanentuser')
		cy.get('#password').type('permanent')
		cy.get('#loginbutton').click()
		cy.contains('Permanent User logged in')
		cy.contains('logout')
	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('permanentuser')
			cy.get('#password').type('permanent')
			cy.get('#loginbutton').click()
		})

		it('a new blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('input[name=title]').type('Test Title')
			cy.get('input[name=author]').type('Test Author')
			cy.get('input[name=url]').type('Test Url')
			cy.contains('create').click()
			cy.contains('Test Title by Test Author')
		})
	})

})

