const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
	const allBlogs = await Blog.find({})
	response.json(allBlogs)
})
// Get blog by id
blogsRouter.get('/:id', async (request, response) => {
	const foundBlog = Blog.findById(request.params.id)
	foundBlog? response.json(foundBlog) : response.status(404).end()
})
// Create a new blog
blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})
// Delete a blog by id
blogsRouter.delete('/:id', async (request, response) => {
	const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
	deletedBlog? response.status(204).end() : response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, blog, { new: true }
	)
	response.json(updatedBlog)
})

module.exports = blogsRouter