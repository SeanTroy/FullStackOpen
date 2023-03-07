const dummy = (blogs) => {
	return 1
}

const likesReducer = (sum, blog) => {
	return sum + blog.likes
}

const totalLikes = (blogs) => {
	return blogs.length
		? blogs.reduce(likesReducer, 0)
		: 0
}

const favoriteBlog = blogs => {
	return blogs.length
		? blogs.sort((a, b) => a.likes > b.likes ? -1 : 1)[0]
		: {}
}

const mostBlogs = blogs => {
	let allAuthors = []

	blogs.forEach(filterBlog => {
		const authorBlogs = blogs.filter(blog => blog.author === filterBlog.author)
		allAuthors.push({
			author: filterBlog.author,
			blogs: authorBlogs.length
		})
	})

	return blogs.length
	? allAuthors.sort((a, b) => a.blogs > b.blogs ? -1 : 1)[0]
	: {}
}

const mostLikes = blogs => {
	let authorLikes = []

	blogs.forEach(filterBlog => {
		const authorBlogs = blogs.filter(blog => blog.author === filterBlog.author)
		authorLikes.push({
			author: filterBlog.author,
			likes: authorBlogs.reduce(likesReducer, 0)
		})
	})

	return blogs.length
	? authorLikes.sort((a, b) => a.blogs > b.blogs ? -1 : 1)[0]
	: {}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
