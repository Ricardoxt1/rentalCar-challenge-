const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos'); //criação de variavel rotas para o arquivo criado sobre os produtos.

app.use('/produtos', rotaProdutos);

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

module.exports = app;