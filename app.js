const express = require('express');
const app = express();

const rotaVeiculos = require('./routes/veiculo'); //criação de variavel rotas para o arquivo criado sobre os veiculos.

app.use('/veiculos', rotaVeiculos);

app.use('/teste/1', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

////////////////////////////////////////////////////////////////////////////////////

const rotaLocacao = require('./routes/locacao'); //criação de variavel rotas para o arquivo criado sobre os veiculos.

app.use('/locacao', rotaLocacao);

app.use('/teste/2', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

////////////////////////////////////////////////////////////////////////////////////

const rotaUsuario = require('./routes/usuario'); //criação de variavel rotas para o arquivo criado sobre os usuarios.

app.use('/usuario', rotaUsuario);

app.use('/teste/3', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

module.exports = app;