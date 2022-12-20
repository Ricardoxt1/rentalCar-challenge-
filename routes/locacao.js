const express = require('express');
const router = express.Router();

router.get('/gethr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de horario'
    });
});


router.post('/posthr', (req, res, next) => {
    const locacao = {
        horarioinicial: req.body.horarioinicial,
        horariotermino: req.body.horariotermino
    }
    res.status(200).send({
        mensagem: 'Horario inserido',
        horarioCriado: horario
    });
});


router.put('/puthr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Horario alterado'
    });
});


router.delete('/delhr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Horario deletado'
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/getdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de datas'
    });
});


router.post('/postdt', (req, res, next) => {
    const data = {
        datainicial: req.body.datainicial,
        datatermino: req.body.datatermino
    }

    res.status(200).send({
        mensagem: 'Data inserida',
        dataCriada: data
    });
});


router.put('/putdt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Data alterada'
    });
});


router.delete('/deldt', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Data deletada'
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getpr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Visualizando preços'
    });
});

router.post('/postpr', (req, res, next) => {
    const preco = {
        preco: req.body.preco,
       
    }

    res.status(200).send({
        mensagem: 'Preço inserido',
        precoCriado: preco
    });
});

router.put('/putpr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Preço alterado'
    });
});

router.delete('/delpr', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Preço deletado'
    });
});





module.exports = router; 