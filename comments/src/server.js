const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4001;

const server = http.createServer(app);

server.listen(port, () => console.log( `Comment server running on ${port}`));