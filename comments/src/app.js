const express = require('express');
const cors = require('cors');
const commentRouter = require('./routes/comment.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/posts', commentRouter);

app.post('/api/v1/events', (req, res) => {
    console.log(`Received Event ${req.body.type}`);

    res.send({});
})

module.exports = app;