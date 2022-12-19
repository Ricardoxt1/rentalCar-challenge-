const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando POST dentro da rota de produtos'
    });
});

router.get('/:id_produto', (req, res, next) => { // essa rota acessa produto exclusivo e seus detalhes
    const id = req.params.id_produto; //chama o id do produto
    
    
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

module.exports = router; // exportando o uso das rotas