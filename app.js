const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////////////////////

const rotaVeiculos = require('./routes/veiculo'); 
app.use('/veiculo', rotaVeiculos);
app.use('/teste/1', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

////////////////////////////////////////////////////////////////////////////////////

const rotaLocacao = require('./routes/locacao');
app.use('/locacao', rotaLocacao);
app.use('/teste/2', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

////////////////////////////////////////////////////////////////////////////////////

const rotaUsuario = require('./routes/usuario'); 
app.use('/usuario', rotaUsuario);
app.use('/teste/3', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Tudo okay'
    });
});

////////////////////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({ 
        erro: {
            mensagem: error.mensagem
        }
    })
});

module.exports = app;