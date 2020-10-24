const musicas = require("../models/musicas.json")
const fs = require("fs")

// Criação do método GET
// rota do método GET no Postman (localhost:3000/musicas)
const getAllMusics = (req, res) => {
    console.log(req.url)
    res.status(200).send(musicas)
}

// Criação do método POST
// rota do método POST no Postman (localhost:3000/musicas)
const createMusic = (req, res) => {
    console.log(req.body);
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musicas.push({ id, title, duration, launchYear, favorited, artists })
    fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravando nova música no array de músicas
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicFound = musicas.find(musica => musica.id == id) // recupero a música criada no array de músicas      
            res.status(200).send(musicFound)
        }
        console.log("Arquivo atualizado com sucesso!")    
    })
    res.status(201).send(musicas);
}

// Criação do método DELETE
// rota do método DELETE no Postman (localhost:3000/musicas/id)

const deleteMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicFound = musicas.find(musica => musica.id == musicId) // encontro a musica pelo id
        const musicIndex = musicas.indexOf(musicFound) // identifico o índice da música no meu array

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musicas.splice(musicIndex, 1) // removo a música pelo índice
        } else {
            res.status(404).send({ message: "Música não encontrada para ser deletada" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravo meu array de músicas sem a música que deletei
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Música deletada com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a música" })
    }
}
// Criação do PUT
// requisição do método PUT no Postman (localhost:3000/musicas/id )
const updateMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const musicFound = musicas.find(musica => musica.id == musicId) // separo a música que irei atualizar      
        const musicIndex = musicas.indexOf(musicFound) // separo o indice da música no array de músicas

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musicas.splice(musicIndex, 1, musicToUpdate) //busco no array a música, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Música não encontrada para ser atualizado" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravo meu json de musicas atualizado
            if (err) {
                res.status(500).send({ message: err }) // caso dê erro retorno status 500
            } else {
                console.log("Arquivo de músicas atualizado com sucesso!")
                const musicUpdated = musicas.find(musica => musica.id == musicId) // separo a música que modifiquei no array
                res.status(200).send(musicUpdated) // envio a música modificada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}

// Criação do método PATCH
// rota do método PATCH no Postman (localhost:3000/musicas/id/favorited)
// rota para alterar apenas o status de favoritada da nossa música

const updateFavoritedStatus = (req, res) => {
    try {
        const musicId = req.params.id // pego a informação do id no parametro da requisição
        const favorited = req.body.favorited // pego a informação de favorited no corpo da requisição. Ele terá valor true ou false, dependendo do que tiver sido passado

        const musicToUpdate = musicas.find(musica => musica.id == musicId) // separo a música que irei mudar o status
        const musicIndex = musicas.indexOf(musicToUpdate) // identifico o índice da música no meu array

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musicToUpdate.favorited = favorited //atualizo o objeto com o novo status informando se foi favoritado ou não
            musicas.splice(musicIndex, 1, musicToUpdate) // removo a música pelo índice substituindo pelo novo
        } else {
            res.status(404).send({ message: "Música não encontrada para informar se foi favoritada ou não" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravo meu json de músicas atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const musicUpdated = musicas.find((musica) => musica.id == musicId) // separo a música que modifiquei no array
                res.status(200).send(musicUpdated) // envio a música modificada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}
// Criação do método GET
// rota do método GET by Id no Postman (localhost:3000/musicas/id)
const getMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = musicas.find((musica) => musica.id == musicId)
    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        res.status(404).send({ message: "Música não encontrada" })
    }
  
    
}
module.exports = {
    
    createMusic,
    deleteMusic,
    updateMusic,
    updateFavoritedStatus,
    getMusic,
    getAllMusics,
    
}