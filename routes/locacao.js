const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno das locações'
    });
});


router.post('/post', (req, res, next) => {

    msyql.getConnection((erro, conn) => {
        conn.query(
            'INSERT INTO locacao (datainicial, datatermino, horarioinicial, horariotermino) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.datainicial, req.body.datatermino, req.body.horarioinicial, req.body.horariotermino, req.body.usuario_id_usuario, req.body.veiculo_id_veiculo],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        responde: null
                    });

                    res.status(200).send({
                        mensagem: 'Locação realizada com sucesso',
                        id_locadora: resultado.insertId
                    });
                }
            }
        )   
    })

    res.status(200).send({
        mensagem: 'Locação criada',
        locacaoCriada: locacao
        
    })
});

router.get('/:id_locadora', (req, res, next) => { 
    const id = req.params.id_locadora; 
        
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