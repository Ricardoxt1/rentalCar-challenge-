const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM usuario;',
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error })}
                return  res.status(200).send({Response: resultado})
            }
        )
          
    });
    
});


router.post('/post', (req, res, next) => {
 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'INSERT INTO usuario (nome, email) VALUES (?, ?)',
            [req.body.nome, req.body.email],
            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Usuario inserido com sucesso',
                    id_usuario: resultado.insertId
                });
            }
        )   
    });
});

router.get('/:id_usuario', (req, res, next) => { 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM usuario WHERE id_usuario = ?;',
            [req.params.id_usuario],
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
            `UPDATE usuario
                SET nome        = ?,
                    email       = ?
             WHERE id_usuario   = ?`,

            [
                req.body.nome,
                req.body.email,
                req.body.id_usuario,
            ],

            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Usuario alterado com sucesso',
                });
            }
        )   
    });
});


router.delete('/del', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `DELETE FROM usuario WHERE id_usuario = ?`, [req.body.id_usuario],
            (error, resultado, field) => {
                conn.release();
                
                if (error) { return res.status(500).send({ error })}

                res.status(200).send({
                    mensagem: 'Usuario excluido com sucesso',
                });
            }
        )   
    });
});

module.exports = router; // exportando o uso das rotas