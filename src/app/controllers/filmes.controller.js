const filmesschema = require('./../models/filmes.model');
const { request } = require('express');

function definirCamposDeBusca(campos) {
    if (campos == 'nome18') {
        return { nome: 1, maior18: 1 }
    } else if (campos == 'nome') {
        return { nome: 1 }
    } else {
        return null
    }
}

class Filme {
    criarFilme(req, res) { 
        // dizendo para a constando body que ela vai receber o valor da requisição na posição body,
        // tudo que for enviado no corpo da requisição vai estar nessa constante
        const body = req.body

        filmesschema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(201).send({ message: "Filme criado com sucesso no banco de dados", filme: data })
            }
        })
    }

    visualizarFilmes(req, res) {
        // se passar esse parâmetro de maior18, vai fazer uma busca de determinado jeito.
        // São parâmetros opcionais
        const campos = req.query.campos
        // a primeira chave informa as condições .find({ESSA AQUI}, ....)
        filmesschema.find({}, definirCamposDeBusca(campos), (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: "Todos os filmes foram recuperados com sucesso", filmes: data })
            }
        })
    }

    visualizarUmFilme(req, res) {
        // esse parâmetro da a possibilidade do usuário informar o nome do filme que será buscado
        // quando a requisição chegar, irá ler os parâmetros para realizar essa requisição
        const nome = req.params.nome

        // vai buscar dentro do banco de dados o name cadastraco que seja igual ao nome que está sendo buscado
        filmesschema.find({ nome: nome }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: `Filme ${nome} foi recuperado com sucesso`, filme: data })
            }
        })
    }

    atualizarUmFilme(req, res) {
        const nomeDoFilmeParaSerAtualizado = req.params.nome
        const novoNomeDoFilme = req.body.nome

        filmesschema.updateOne({ nome: nomeDoFilmeParaSerAtualizado }, { $set: req.body }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua atualização", error: err })
            } else {
                if (data.n > 0) {
                    filmesschema.findOne({ nome: novoNomeDoFilme }, (error, data) => {
                        if (err) {
                            res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: error })
                        } else {
                            res.status(200).send({ message: `File ${nomeDoFilmeParaSerAtualizado} teve seu nome atualizado para ${novoNomeDoFilme}`, filme: data })
                        }
                    })
                }
            }
        })
    }
}

// já exporta a classe instanciada, para quem importar ja tem acesso à todos os método
module.exports = new Filme() 