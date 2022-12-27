const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/get', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM locacao;',
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
            'INSERT INTO locacao (datainicial, datatermino, horarioinicial, horariotermino, usuario_id_usuario, veiculo_id_veiculo) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.datainicial, req.body.datatermino, req.body.horarioinicial, req.body.horariotermino, req.body.usuario_id_usuario, req.body.veiculo_id_veiculo],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        responde: null
                    });
                }
                res.status(200).send({
                    mensagem: 'Locação realizada com sucesso',
                    id_locadora: resultado.insertId
                });
                
            }
        )   
    });
});

router.get('/:id_locacao', (req, res, next) => { 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM locacao WHERE id_locacao = ?;',
            [req.params.id_locacao],
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error })}
                return  res.status(200).send({Response: resultado})
            }
        )    
    });
});

router.put('/put', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `UPDATE locacao
                SET datainicial             = ?,
                    datatermino             = ?,
                    horarioinicial          = ?,
                    horariotermino          = ?,
                    usuario_id_usuario      = ?,
                    veiculo_id_veiculo      = ?
             WHERE id_locacao               = ?`,

            [
                req.body.datainicial,
                req.body.datatermino,
                req.body.horarioinicial,
                req.body.horariotermino,
                req.body.usuario_id_usuario,
                req.body.veiculo_id_veiculo,
                req.body.id_locacao,
            ],

            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Locação alterada com sucesso',
                });
            }
        )   
    });
    
});

router.delete('/del', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `DELETE FROM locacao WHERE id_locacao = ?`, [req.body.id_locacao],
            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Locaçâo excluida com sucesso',
                });
            }
        )   
    });
});

module.exports = router; 