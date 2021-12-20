const { createServer } = require('http');
const app = require('./app');

const port = process.env.PORT || 4003;

const server = createServer(app);

server.listen(port, () => console.log(`Moderation listening on ${port}`));