// Importando dependências necessárias para rodar a minha API

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const cors = require('cors')

const PORT = process.env.PORT || 3000

// Configurando o body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

// Configurando o CORS
app.use(cors())

// Configurando cabeçalhos de response padrão
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow_Header', 'Origin, X_requested-With, Content-Type, Accept')
    next() //serve para ele continuar executando esse trecho de código
})

// Configurando o endpoint / para responder um JSON com uma mensagem
app.get('/', (req, res) => {
    res.send({ message: `API ouvindo na porta ${PORT}` })
})

// iniciando o servidor da API na porta configurada na variável ambiente ou 3000
app.listen(PORT, () => {
    // chama-se TEMPLATE STRING quando usamos `` para concatenar variáveis
    console.log(`API ouvindo na porta ${PORT}`)
})