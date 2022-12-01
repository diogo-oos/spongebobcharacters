const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());

const characters = require('./src/data/characters.json');

server.listen(3000, () => {
    console.log('API iniciada, clique aqui: http://localhost:3000/ para acessar');
});

const sortByName = (array) => {
    array.sort((a, b) => a.nome > b.nome ? 1 : -1);
}

const sortByApparitions = (array) => {
    array.sort((a, b) => a.qtdAparicoes < b.qtdAparicoes ? 1 : -1);
}

server.get('/characters/alphabeticalOrder', (request, response) => {
    sortByName(characters);
    return response.json(characters)
});

server.get('/characters/orderByApparitions', (request, response) => {
    sortByApparitions(characters);
    return response.json(characters);
})