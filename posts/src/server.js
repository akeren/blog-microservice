const { createServer } = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = createServer(app);

server.listen(port, () => console.log(`Post service listening on ${port}`));