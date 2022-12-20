const express = require('express');
const router = express.Router();


// retorna todos os veiculos
router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando veiculos'
    });
});

// insere todos os veiculos
router.post('/post', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Veiculo inserido'
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

// alterar um veiculo e seus dados
router.put('/put', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Alteração de veiculo'
    });
});

// deletar um veiculo
router.delete('/del', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Veiculo deletado'
    });
});

module.exports = router; // exportando o uso das rotas