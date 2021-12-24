const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/api/v1/events', (req, res) => {
	const event = req.body;

	axios.post('http://posts-clusterip-service:4000/api/v1/events', event);
	axios.post('http://comments-service:4001/api/v1/events', event);
	axios.post('http://query-service:4002/api/v1/events', event);
	axios.post('http://moderation-service:4003/api/v1/events', event);

	res.status(200).json({
		status: true,
		code: 200,
		message: 'Event broadcasted successfully.'
	});
});

module.exports = app;
