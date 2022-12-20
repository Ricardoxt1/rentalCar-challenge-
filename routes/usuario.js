const express = require('express');
const router = express.Router();



router.get('/getuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de usuario'
    });
});


router.post('/postuser', (req, res, next) => {
    const usuario = {
       id: req.body.id, 
       nome: req.body.nome,
       email: req.body.email,
       senha: req.body.senha,
       
    }
    res.status(200).send({
        mensagem: 'Usuario inserido',
        usuarioCriado: usuario
    });
});


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


router.put('/putuser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Alteração de usuario'
    });
});


router.delete('/deluser', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usuario deletado'
    });
});

module.exports = router; // exportando o uso das rotas