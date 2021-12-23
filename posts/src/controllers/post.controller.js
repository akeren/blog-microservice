const uuid = require('../utils/uuid');
const axios = require('axios');

const posts = [];

exports.index = (req, res) => {
	res.status(200).json({
		status: true,
		code: 200,
		message: 'Posts retrieved successfully',
		data: posts
	});
};

exports.store = async (req, res) => {
	const { title } = req.body;
	const id = uuid();

	if (!title) {
		res.status(422).json({
			status: false,
			code: 422,
			message: 'Title is required'
		});
	}

	const post = { id, title };

	await axios.post('http://event-bus-service:4005/api/v1/events', {
		type: 'PostCreated',
		data: post
	});

	posts.push(post);

	res.status(201).json({
		status: true,
		code: 201,
		message: 'Post created successfully',
		data: post
	});
};
