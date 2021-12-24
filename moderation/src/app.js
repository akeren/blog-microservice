const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/v1/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		await axios.post('http://event-bus-service:4005/api/v1/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				postId: data.postId,
				content: data.content,
				status
			}
		});

		res.status(200).json({
			status: true,
			code: 200,
			message: 'Comment moderated successfully'
		});
	}
});

module.exports = app;
