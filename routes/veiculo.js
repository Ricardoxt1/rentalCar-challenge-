const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM veiculo;',
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error })}
                return  res.status(200).send({Response: resultado})
            }
        )
          
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
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM veiculo WHERE id_veiculo = ?;',
            [req.params.id_veiculo],
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error })}
                return  res.status(200).send({ Response: resultado })
            }
        )    
    });
});

router.put('/put', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `UPDATE veiculo
                SET marca        = ?,
                    modelo       = ?,
                    ano          = ?
             WHERE id_veiculo   = ?`,

            [
                req.body.marca,
                req.body.modelo,
                req.body.ano,
                req.body.id_veiculo,
            ],

            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(201).send({
                    mensagem: 'Veiculo alterado com sucesso',
                });
            }
        )   
    });
});


router.delete('/del', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `DELETE FROM veiculo WHERE id_veiculo = ?`, [req.body.id_veiculo],
            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Veiculo excluido com sucesso',
                });
            }
        )   
    });
});

module.exports = router; // exportando o uso das rotas