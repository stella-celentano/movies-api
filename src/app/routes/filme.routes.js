const express = require('express');
// dentro da interface Router tem todos os métodos de rotas disponíveis
const route = express.Router(); 

const FilmeController = require('./../controllers/filme.controller');

route.get('/listarTodos', FilmeController.buscarTodosOsFilmes);
route.get('/listarUm/:nomeFilme', FilmeController.buscarUmFilmePeloNome);
route.post('/criar', FilmeController.criarFilme);
// síntaxe: route.método('nome_da_rota', controller_responsável.nome_do_método_no_controller) 
// essa rota redireciona direto para o método e executa o entrypoint


module.exports = route