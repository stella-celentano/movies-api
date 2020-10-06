const express = require('express');
// dentro da interface Router tem todos os métodos de rotas disponíveis
const route = express.Router(); 

const Filme = require('./../controllers/filme.controller');

route.get('/listarTodos', Filme.buscarTodosOsFilmes);
route.get('/listarUm/:nomeFilme', Filme.buscarUmFilmePeloNome);
route.post('/criar', Filme.criarFilme);
route.get('/validarNomeFilme', Filme.validarNomeFilme)
route.put('/atualizar/:movieId', Filme.update)
// síntaxe: route.método('nome_da_rota', controller_responsável.nome_do_método_no_controller) 
// essa rota redireciona direto para o método e executa o entrypoint


module.exports = route