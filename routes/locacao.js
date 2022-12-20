const express = require('express');
const router = express.Router();


// retorna todos os horarios
router.get('/gethr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de horario'
    });
});

// insere todos os horarios
router.post('/posthr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Horario inserido'
    });
});

// alterar um horario e seus dados
router.put('/puthr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Horario alterado'
    });
});

// deletar um horario 
router.delete('/delhr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Horario deletado'
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// retorna todas as datas 
router.get('/getdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de datas'
    });
});

// insere as datas
router.post('/postdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Data inserida'
    });
});

// alterar uma data
router.put('/putdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Data alterada'
    });
});

// deletar uma data
router.delete('/deldt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Data deletada'
    });
});

module.exports = router; // exportando o uso das rotas