const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/posts', postRouter);

app.post('/api/v1/events', (req, res) => {
    console.log(`Received event: ${req.body.type}`);

    res.send({});
});

module.exports = app;