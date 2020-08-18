const express = require('express');
// dentro da interface Router tem todos os métodos de rotas disponíveis
const route = express.Router(); 

const FilmeController = require('./../controllers/filmes.controller');
const filmesController = require('./../controllers/filmes.controller');

route.post('/criar', FilmeController.criarFilme);
// síntaxe: route.método('nome_da_rota', controller_responsável.nome_do_método_no_controller) 
// essa rota redireciona direto para o método e executa o entrypoint
route.get('/visualizarTodos', FilmeController.visualizarFilmes);
route.get('/visualizarUm/:nome', FilmeController.visualizarUmFilme);
route.put('/atualizarUm/:nome', FilmeController.atualizarUmFilme);
route.delete('/apagarUm/:nome', FilmeController.apagarUmFilme);

module.exports = route