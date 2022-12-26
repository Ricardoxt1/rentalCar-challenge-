const express = require('express');
const router = express.Router();



router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando veiculos'
    });
});


router.post('/post', (req, res, next) => {
    const veiculo = {
        id_veiculo: req.body.id_veiculo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,   
    }

    res.status(200).send({
        mensagem: 'Veiculo inserido',
        veiculoCriado: veiculo
    });
});

router.get('/:id_veiculo', (req, res, next) => { 
    const id = req.params.id_veiculo; 
    
    
    if (id === 'id_veiculo') {
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


router.put('/put', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Alteração de veiculo'
    });
});


router.delete('/del', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Veiculo deletado'
    });
});

module.exports = router; // exportando o uso das rotas