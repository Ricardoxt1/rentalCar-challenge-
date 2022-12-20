const express = require('express');
const router = express.Router();


// retorna todos os usuarios
router.get('/getuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de usuario'
    });
});

// insere todos os usuarios
router.post('/postuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usuario inserido'
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
        mensagem: 'Alteração de usuario'
    });
});

// deletar um usuario
router.delete('/deluser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usuario deletado'
    });
});

module.exports = router; // exportando o uso das rotas