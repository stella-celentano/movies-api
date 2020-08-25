const filmesschema = require('./../models/filme.model');
const { request } = require('express');

class Filme {

    buscarTodosOsFilmes(req, res) {
        // a primeira chave informa as condições .find({ESSA AQUI}, ....)
        filmesschema.find({})
            .populate('diretor', { nome: 1, imagem: 1 })
            .sort({ nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: "Não existem filmes cadastrados no banco de dados" })
                    } else {
                        res.status(200).send({ message: "Todos os filmes foram recuperados com sucesso", filmes: data })
                    }
                }
            })
    }

    buscarUmFilmePeloNome(req, res) {
        // esse parâmetro da a possibilidade do usuário informar o nome do filme que será buscado
        // quando a requisição chegar, irá ler os parâmetros para realizar essa requisição
        const { nomeFilme } = req.params

        if (nomeFilme == undefined || nomeFilme == 'null') {
            res.status(400).send({message: "O nome do filme deve ser obrigatoriamente preenchido"})
        }

        // vai buscar dentro do banco de dados o name cadastraco que seja igual ao nome que está sendo buscado
        filmesschema.find({ nome: nomeFilme })
            .populate('diretor', { nome: 1, imagem: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: `Filme ${nomeFilme} não foi encontrado no banco de dados` })
                    } else {
                        res.status(200).send({ message: `Filme ${nomeFilme} foi recuperado com sucesso`, filme: data })
                    }
                }
            })
    }

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
}

// já exporta a classe instanciada, para quem importar ja tem acesso à todos os método
module.exports = new Filme() 