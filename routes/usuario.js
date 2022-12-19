const express = require('express');
const router = express.Router();


// retorna todos os usuarios
router.get('/getuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de usuario'
    });
});

// insere todos os usuarios
router.post('/postuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando POST dentro da rota de usuario'
    });
});

// retorna um usuario e seus dados
router.get('/:id_usuario', (req, res, next) => { // essa rota acessa um usuario exclusivo e seus detalhes
    const id = req.params.id_usuario; //chama o id do usuario
    
    
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

// alterar um usuario e seus dados
router.put('/putuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando PUT dentro da rota de usuario'
    });
});

// deletar um usuario
router.delete('/deluser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando DELETE dentro da rota de usuario'
    });
});

module.exports = router; // exportando o uso das rotas