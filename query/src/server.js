const { createServer } = require('http');
const app = require('./app');

const port = process.env.PORT || 4002;

const server = createServer(app);

server.listen(port, () => console.log(`Query service listening on ${port}`));