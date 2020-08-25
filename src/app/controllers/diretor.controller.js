const diretor = require('./../models/diretor.model');

class Diretor {

    buscarTodosOsDiretores(req, res) {
        diretor.find({}, { filmes: 0 })
            .sort({ nome: 1 }) //vai ordenar de forma ascendente A - Z
            .exec((err, data) => { //vai executar a callback da query
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: "Não foram encontrados diretores para exibir" })
                    } else {
                        res.status(200).send({ message: "Diretores recuperados com sucesso", data: data })
                    }
                }
            }) 
    }

}

module.exports = new Diretor();