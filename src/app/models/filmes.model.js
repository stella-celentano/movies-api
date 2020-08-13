const { Schema, model } = require('mongoose');

const FilmeSchema = new Schema({
    name: {
        type: String,
        required: true,
        // pega a string e vai tirar os espaços que tem no começo e no final, 
        // verificando e apagando até que o primeiro e o último caracter seja válido
        trim: true
    },
    genero: {
        type: String,
        required: false,
        trim: true
    },
    ano: {
        type: Number,
        required: false
    },
    maior18: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
        // versiona os documentos do banco se essa propriedade estiver ativada, 
        // cada vez que alterar adiciona uma versão nova e se um dia quiser voltar 
        // para a primeira versão, é possível (não vamos configurar isso)
        versionKey: false 
    }
) 

module.exports = model('filmeschema', FilmeSchema) 