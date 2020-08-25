// Importando dependências necessárias para rodar a minha API
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database = require('./src/config/database')

// Importando as rotas da aplicação
const FilmesRoutes = require('./src/app/routes/filmes.routes');
const DiretorRoutes = require('./src/app/routes/diretor.routes');

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

// quando mandar a requisição vai procurar uma rota que seja indêntica ao que é disponibilizado na API,
// antes de passar as rotas disponíveis de filmes, ele manda a requisição para o arquivo FilmesRoutes
app.use('/filmes', FilmesRoutes); 
app.use('/diretor', DiretorRoutes);

// Configurando o endpoint * que é retornado quando uma URL requisitada não existe
app.use('*', (req, res) => {
    res.send({ message: 'API não encontrada' })
})

// iniciando o servidor da API na porta configurada na variável ambiente ou 3000
app.listen(PORT, () => {
    // chama-se TEMPLATE STRING quando usamos `` para concatenar variáveis
    console.log(`API ouvindo na porta ${PORT}`)
})