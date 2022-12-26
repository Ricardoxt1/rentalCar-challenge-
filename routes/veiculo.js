const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando veiculos'
    });
});


router.post('/post', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO veiculo (marca, modelo, ano) VALUES (?, ?, ?)',
            [req.body.marca, req.body.modelo, req.body.ano],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        responde: null
                    });
                }
                res.status(200).send({
                    mensagem: 'Veiculo inserido com sucesso',
                    id_veiculo: resultado.insertId
                });
                
            }
        )   
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