const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM usuario',
            (error, resultado, field) => {
                conn.release();
                
                if (error) {
                    return res.status(500).send({
                        error: error,
                        responde: null
                    });
                }

                res.status(200).send({
                    mensagem: 'Retorno de usuario',
                    id_usuario: resultado.insertId
                });
            }
        )
          
    });
    
});


router.post('/post', (req, res, next) => {
 
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO usuario (nome, email) VALUES (?, ?)',
            [req.body.nome, req.body.email],
            (error, resultado, field) => {
                conn.release();
                
                if (error) {
                    return res.status(500).send({
                        error: error,
                        responde: null
                    });
                }

                res.status(200).send({
                    mensagem: 'Usuario inserido com sucesso',
                    id_usuario: resultado.insertId
                });
            }
        )   
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