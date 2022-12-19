const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app); //criação do servidor, pegando arquivo app e fazendo ouvir na porta 3000
server.listen(port);

