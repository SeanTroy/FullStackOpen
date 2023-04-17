describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		const user = { name: 'Permanent User', username: 'permanentuser', password: 'permanent' }
		cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
		cy.visit('')
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
			cy.login({ username: 'permanentuser', password: 'permanent' })
		})

		it('a new blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('input[name=title]').type('Test Title')
			cy.get('input[name=author]').type('Test Author')
			cy.get('input[name=url]').type('Test Url')
			cy.contains('create').click()
			cy.get('.blogentry').contains('Test Title by Test Author')
		})

		it('a blog can be liked', function () {
			cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'Test Url' })
			cy.get('.blogentry').contains('view').click()
			cy.get('.blogentry').contains('likes: 0')
			cy.get('.blogentry').contains('like').click()
			cy.get('.blogentry').contains('likes: 1')
		})

		it('a blog can be deleted', function () {
			cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'Test Url' })
			cy.get('.blogentry').contains('view').click()
			cy.get('.blogentry').contains('remove').click()
			cy.on('window:confirm', () => true) // cypress will auto accept confirmations anyway
			cy.get('.blogentry').should('not.exist')
		})

		it('only the user who created a blog can see the delete button', function () {
			cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'Test Url' })
			cy.get('#logoutbutton').click()
			const testuser = { name: 'Test User', username: 'testuser', password: 'testing' }
			cy.request('POST', `${Cypress.env('BACKEND')}/users/`, testuser)
			cy.login({ username: 'testuser', password: 'testing' })
			cy.contains('view').click()
			cy.contains('remove').should('not.exist')
		})

		it('blogs are ordered by likes', function () {
			cy.createBlog({ title: 'Least Likes', author: 'Test Author', url: 'Test Url', likes: 3 })
			cy.createBlog({ title: 'Most Likes', author: 'Test Author', url: 'Test Url', likes: 4 })
			cy.createBlog({ title: 'Average Likes', author: 'Test Author', url: 'Test Url', likes: 4 })
			cy.contains('Most Likes').contains('view').click()
			cy.contains('Average Likes').contains('view').click()
			cy.contains('Least Likes').contains('view').click()
			cy.contains('Most Likes').contains('like').click()

			cy.get('.blogentry').eq(0).should('contain', 'Most Likes')
				.and('contain', 'likes: 5')
			cy.get('.blogentry').eq(1).should('contain', 'Average Likes')
				.and('contain', 'likes: 4')
			cy.get('.blogentry').eq(2).should('contain', 'Least Likes')
				.and('contain', 'likes: 3')

			cy.contains('Most Likes').contains('unlike').click()
			cy.contains('Average Likes').contains('like').click()

			cy.get('.blogentry').eq(0).should('contain', 'Average Likes')
				.and('contain', 'likes: 5')
			cy.get('.blogentry').eq(1).should('contain', 'Most Likes')
				.and('contain', 'likes: 4')
		})
	})

})