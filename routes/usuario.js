const express = require('express');
const router = express.Router();


router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno de usuario'
    });
});


router.post('/post', (req, res, next) => {
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

router.get('/:id_usuario', (req, res, next) => { 
    const id = req.params.id_usuario; 
        
    if (id === 'id_usuario') {
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
        mensagem: 'Alteração de usuario'
    });
});


router.delete('/del', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usuario deletado'
    });
});

module.exports = router; // exportando o uso das rotas