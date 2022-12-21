const express = require('express');
const router = express.Router();

router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de horario'
    });
});


router.post('/posthr', (req, res, next) => {
    const horario = {
        horarioinicial: req.body.horarioinicial,
        horariotermino: req.body.horariotermino
    }
    res.status(200).send({
        mensagem: 'Horario inserido',
        horarioCriado: horario
    });
});

router.get('/:id_locadora', (req, res, next) => { // essa rota acessa um usuario exclusivo e seus detalhes
    const id = req.params.id_locadora; //chama o id do usuario
        
    if (id === 'id_locadora') {
        res.status(200).send({
            mensagem: 'Você encontrou o ID especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
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

module.exports = router; 