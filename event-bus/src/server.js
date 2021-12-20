const { createServer } = require('http');
const app = require('./app');

const port = process.env.PORT || 4005;

const server = createServer(app);

server.listen(port, () => console.log(`Event bus listening on ${port}`));