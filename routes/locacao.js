const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/get', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM locacao;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Listagem de todas as locações',
                    quantidade: result.length,
                    locacao: result.map(loca => {
                        return {
                            id_locacao: loca.id_locacao,
                            datainicial: loca.datainicial,
                            datatermino: loca.datatermino,
                            horarioinicial: loca.horarioinicial,
                            horariotermino: loca.horariotermino,
                            usuario_id_usuario: loca.usuario_id_usuario,
                            veiculo_id_veiculo: loca.veiculo_id_veiculo,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna uma locação especifica com suas informações',
                                url: 'http://localhost:3000/locacao/' + loca.id_locacao
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
        conn.query(
            'INSERT INTO locacao (datainicial, datatermino, horarioinicial, horariotermino, usuario_id_usuario, veiculo_id_veiculo) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.datainicial, req.body.datatermino, req.body.horarioinicial, req.body.horariotermino, req.body.usuario_id_usuario, req.body.veiculo_id_veiculo],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Locação cadastrada com sucesso',
                    locacaoCriada: {
                        id_locacao:                 req.body.id_locacao,
                        datainicial:               req.body.datainicial,
                        datatermino:               req.body.datatermino,
                        horarioinicial:         req.body.horarioinicial,
                        horariotermino:         req.body.horariotermino,
                        usuario_id_usuario: req.body.usuario_id_usuario,
                        veiculo_id_veiculo: req.body.veiculo_id_veiculo,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna as locações existentes',
                            url: 'http://localhost:3000/locacao/get', 
                        }
                    }
                }
                return res.status(200).send(response);
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
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error : error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possivel encontrar uma locação com este id'
                    })  
                }
                const response = {
                    mensagem: 'Locação encontrada com sucesso',
                    locacao: {
                        id_locacao:                 result[0].id_locacao,
                        datainicial:               result[0].datainicial,
                        datatermino:               result[0].datatermino,
                        horarioinicial:         result[0].horarioinicial,
                        horariotermino:         result[0].horariotermino,
                        usuario_id_usuario: result[0].usuario_id_usuario,
                        veiculo_id_veiculo: result[0].veiculo_id_veiculo,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna as locações existentes',
                            url: 'http://localhost:3000/locacao/get', 
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

            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Locação alterada com sucesso',
                    locacaoAlterada: {
                        id_locacao:                 req.body.id_locacao,
                        datainicial:               req.body.datainicial,
                        datatermino:               req.body.datatermino,
                        horarioinicial:         req.body.horarioinicial,
                        horariotermino:         req.body.horariotermino,
                        usuario_id_usuario: req.body.usuario_id_usuario,
                        veiculo_id_veiculo: req.body.veiculo_id_veiculo,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna uma locação especifica',
                            url: 'http://localhost:3000/locacao/' + req.body.id_locacao
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
            `DELETE FROM locacao WHERE id_locacao = ?`, [req.body.id_locacao],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Locação excluida com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Cadastro de locação',
                        url: 'http://localhost:3000/locacao/post',
                        body: {
                            datainicial: 'String',
                            datatermino: 'String',
                            horarioinicial: 'String',
                            horariotermino: 'String',
                            usuario_id_usuario: 'Number',
                            veiculo_id_veiculo: 'Number',
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )   
    });
});

module.exports = router; 