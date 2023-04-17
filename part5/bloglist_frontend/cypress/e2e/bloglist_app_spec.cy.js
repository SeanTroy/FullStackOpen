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

	describe('login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('permanentuser')
			cy.get('#password').type('permanent')
			cy.get('#loginbutton').click()
			cy.contains('Permanent User logged in')
			cy.contains('logout')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('wronguser')
			cy.get('#password').type('wrongpassword')
			cy.get('#loginbutton').click()
			cy.get('.notification')
				.contains('User not found. Please check your credentials.')
				.and('have.css', 'color', 'rgb(255, 0, 0)') // the color of the notification is red
			cy.contains('login')
		})
	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('permanentuser')
			cy.get('#password').type('permanent')
			cy.get('#loginbutton').click()
			cy.contains('new blog').click()
			cy.get('input[name=title]').type('Test Title')
			cy.get('input[name=author]').type('Test Author')
			cy.get('input[name=url]').type('Test Url')
			cy.contains('create').click()
		})

		it('a new blog can be created', function () {
			cy.get('.blogentry').contains('Test Title by Test Author')
		})

		it('a blog can be liked', function () {
			cy.get('.blogentry').contains('view').click()
			cy.get('.blogentry').contains('likes: 0')
			cy.get('.blogentry').contains('like').click()
			cy.get('.blogentry').contains('likes: 1')
		})

		it('a blog can be deleted', function () {
			cy.get('.blogentry').contains('Test Title by Test Author')
			cy.contains('view').click()
			cy.contains('remove').click()
			cy.on('window:confirm', () => true) // cypress will auto accept confirmations anyway
			cy.get('.blogentry').should('not.exist')
		})

		it('only the user who created a blog can see the delete button', function () {
			cy.get('#logoutbutton').click()
			const testuser = {
				name: 'Test User',
				username: 'testuser',
				password: 'testing'
			}
			cy.request('POST', 'http://localhost:3003/api/users/', testuser)
			cy.get('#username').type('testuser')
			cy.get('#password').type('testing')
			cy.get('#loginbutton').click()
			cy.contains('view').click()
			cy.contains('remove').should('not.exist')
		})

	})

})