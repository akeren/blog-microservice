const uuid = require('../utils/uuid');
const axios = require('axios');

const comments = [];

const filterComments = (id) => {
	return comments.filter((comment) => comment.postId === id);
};

exports.index = (req, res) => {
	const commentsData = filterComments(req.params.id);

	res.status(200).json({
		status: true,
		code: 200,
		message: 'Comments retrieved successfully',
		data: commentsData
	});
};

exports.store = async (req, res) => {
	const commentId = uuid();
	const { content } = req.body;

	if (!content) {
		res.status(422).json({
			status: false,
			code: 422,
			message: 'Content is required'
		});
	}

	const comment = {
		id: commentId,
		content,
		postId: req.params.id,
		status: 'pending'
	};

	comments.push(comment);

	await axios.post('http://event-bus-service:4005/api/v1/events', {
		type: 'CommentCreated',
		data: comment
	});

	const { type, data } = req.body;

	if (type === 'CommentModerated') {
		const { id, postId, status, content } = data;

		const commentsData = filterComments(postId);
		const findComment = commentsData.find((comment) => comment.id === id);
		findComment.status = status;

		await axios.post('http://event-bus-service:4005/api/v1/events', {
			type: 'CommentUpdated',
			data: {
				id,
				postId,
				content,
				status
			}
		});
	}

	res.status(201).json({
		status: true,
		code: 201,
		message: 'Comment created successfully',
		data: comment
	});
};
