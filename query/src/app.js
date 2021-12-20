const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/api/v1/events', (req, res) => {
	res.send(posts);
});
app.post('/api/v1/events', (req, res) => {
	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		post.comments.push({ id, content, status });

		res.status(201).send({});
	}
});

module.exports = app;
