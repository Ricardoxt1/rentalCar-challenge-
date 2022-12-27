const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM usuario;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Listagem de todos os usuarios',
                    quantidade: result.length,
                    usuarios: result.map(user => {
                        return {
                            id_usuario: user.id_usuario,
                            nome: user.nome,
                            email: user.email,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna um usuario especifico com suas informações',
                                url: 'http://localhost:3000/usuario/' + user.id_usuario
                            }
                        }
                    })
                }
                return  res.status(200).send({response});
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
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Usuario cadastrado com sucesso',
                    usuarioCriado: {
                        id_usuario: req.body.id_usuario,
                        nome: req.body.nome,
                        email: req.body.email,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os usuarios existentes',
                            url: 'http://localhost:3000/usuario/get', 
                        }
                    }
                }
                return res.status(200).send(response);
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
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error })}

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possivel encontrar um usuario com este id'
                    })  
                }
                const response = {
                    mensagem: 'Usuario encontrado com sucesso',
                    usuario: {
                        id_usuario: result[0].id_usuario,
                        nome: result[0].nome,
                        email: result[0].email,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os usuarios existentes',
                            url: 'http://localhost:3000/usuario/get', 
                        }
                    }
                }
                return res.status(200).send(response);
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
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Usuario alterado com sucesso',
                    usuarioAlterado: {
                        id_usuario: req.body.id_usuario,
                        nome: req.body.nome,
                        email: req.body.email,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um usuario especifico',
                            url: 'http://localhost:3000/usuario/' + req.body.id_usuario
                        } 
                    }
                }
                return res.status(201).send(response);
            }
        )   
    });
});


router.delete('/del', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            `DELETE FROM usuario WHERE id_usuario = ?`,[req.body.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error })}
                const response = {
                    mensagem: 'Usuario excluido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Cadastro de usuario',
                        url: 'http://localhost:3000/usuario/post',
                        body: {
                            nome: 'String',
                            email: 'Email'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )   
    });
});

module.exports = router; // exportando o uso das rotas