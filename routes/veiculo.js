const express = require('express');
const router = express.Router();



router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando veiculos'
    });
});


router.post('/post', (req, res, next) => {
    const veiculo = {
        id: req.body.id,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,   
    }

    res.status(200).send({
        mensagem: 'Veiculo inserido',
        veiculoCriado: veiculo
    });
});

// retorna um veiculo e seus dados
router.get('/:id_veiculo', (req, res, next) => { // essa rota acessa veiculo exclusivo e seus detalhes
    const id = req.params.id_veiculo; //chama o id do veiculo
    
    
    if (id === 'especial') {
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