const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/get', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error })}
        conn.query(
            'SELECT * FROM veiculo;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Listagem de todos os veiculos',
                    quantidade: result.length,
                    veiculos: result.map(car => {
                        return {
                            id_veiculo: car.id_veiculo,
                            marca: car.marca,
                            modelo: car.modelo,
                            ano: car.ano,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna um veiculo especifico com suas informações',
                                url: 'http://localhost:3000/veiculo/' + car.id_veiculo
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
            'INSERT INTO veiculo (marca, modelo, ano) VALUES (?, ?, ?)',
            [req.body.marca, req.body.modelo, req.body.ano],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Veiculo cadastrado com sucesso',
                    veiculoCriado: {
                        id_veiculo:     req.body.id_veiculo,
                        marca:               req.body.marca,
                        modelo:             req.body.modelo,
                        ano:                   req.body.ano,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os veiculos existentes',
                            url: 'http://localhost:3000/veiculo/get', 
                        }
                    }
                }
                return res.status(200).send(response);
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
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error })}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possivel encontrar um veiculo com este id'
                    })  
                }
                const response = {
                    mensagem: 'Veiculo encontrado com sucesso',
                    veiculo: {
                        id_veiculo: result[0].id_veiculo,
                        marca:           result[0].marca,
                        modelo:         result[0].modelo,
                        ano:               result[0].ano,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os veiculos existentes',
                            url: 'http://localhost:3000/veiculo/get', 
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
            `UPDATE veiculo
                SET marca        = ?,
                    modelo       = ?,
                    ano          = ?
             WHERE id_veiculo    = ?`,

            [
                req.body.marca,
                req.body.modelo,
                req.body.ano,
                req.body.id_veiculo,
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Veiculo alterado com sucesso',
                    veiculoAlterado: {
                        id_veiculo: req.body.id_veiculo,
                        marca:           req.body.marca,
                        modelo:         req.body.modelo,
                        ano:               req.body.ano,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um veiculo especifico',
                            url: 'http://localhost:3000/veiculo/' + req.body.id_veiculo
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
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM veiculo WHERE id_veiculo = ?`, [req.body.id_veiculo],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Veiculo excluido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Cadastro de veiculo',
                        url: 'http://localhost:3000/veiculo/post',
                        body: {
                            marca:  'String',
                            modelo: 'String',
                            ano:    'Number',
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )   
    });
});

module.exports = router; // exportando o uso das rotas