const express = require('express');
const router = express.Router();


// retorna todos os horarios
router.get('/gethr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de horarios'
    });
});

// insere todos os horarios
router.post('/posthr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando POST dentro da rota de horarios'
    });
});

// alterar um horario e seus dados
router.put('/puthr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando PUT dentro da rota de horario'
    });
});

// deletar um horario 
router.delete('/delhr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando DELETE dentro da rota de horario'
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// retorna todas as datas 
router.get('/getdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de datas'
    });
});

// insere as datas
router.post('/postdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando POST dentro da rota de data'
    });
});

// alterar uma data
router.put('/putdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando PUT dentro da rota de datas'
    });
});

// deletar uma data
router.delete('/deldt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando DELETE dentro da rota de datas'
    });
});

module.exports = router; // exportando o uso das rotas