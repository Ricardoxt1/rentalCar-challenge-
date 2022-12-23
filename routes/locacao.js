const express = require('express');
const router = express.Router();

router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno das locações'
    });
});


router.post('/post', (req, res, next) => {
    const locacao = {
        id:req.body.id,
        veiculo_id: req.body.veiculo_id,
        usuario_id: req.body.usuario_id,
        datainicial: req.body.datainicial,
        datatermino: req.body.datatermino,
        horarioinicial: req.body.horarioinicial,
        horariotermino: req.body.horariotermino,
    }
    res.status(200).send({
        mensagem: 'Locação criada',
        locacaoCriada: locacao
        
    })
});

router.get('/:id_locadora', (req, res, next) => { // essa rota acessa um usuario exclusivo e seus detalhes
    const id = req.params.id_locadora; //chama o id do usuario
        
    if (id === 'id_locadora') {
        res.status(200).send({
            mensagem: 'Você encontrou o ID especial de uma locação',
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
        mensagem: 'Locação alterada'
    });
});


router.delete('/del', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Locação deletada'
    });
});

module.exports = router; 