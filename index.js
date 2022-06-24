const express = require('express');
const { diccionario } = require('./diccionario.js');

const app = express();

app.get('/', (req, res) => {
    res.send(`palabras-api`);
})

app.get('/api/palabras/', (req, res) => {
    res.send({ palabras: diccionario.map(palabra => palabra.toLowerCase())});
})

app.get('/api/palabras/aleatorio/', (req, res) => {
    res.send({ palabra: diccionario[ObtenerNumeroAleatorio(0, diccionario.length - 1)].toLowerCase()});
});

app.get('/api/palabras/:empiezaCon', (req, res) => {
    const letra = req.params.empiezaCon.toLowerCase();

    const object = {
        palabras: diccionario.filter(palabra => EsPalabraValida(letra, palabra, req)).map(palabra => palabra.toLowerCase())
    }; 

    res.send(object)
});

function EsPalabraValida(letra, palabra, req) {
    let validacionQuery = true;

    if ('query' in req) {
        if ('longitud' in req.query) {
            const longitud = parseInt(req.query.longitud);
            validacionQuery = palabra.length === longitud;
        }
    }

    return palabra.toLowerCase().startsWith(letra) && validacionQuery;
}

function ObtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
