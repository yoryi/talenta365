const express = require('express');
const router = express.Router();
const Axios = require('axios');
require('dotenv').config()

router.post('/Peliculas', async (req, res,) => {

    //PETICION HTTP
    Axios.get('https://swapi.dev/api/films/')
    .then(Response => fetch(Response.data, res))

    async function fetch(data, res) {

        //lista
        data.results.forEach(elem);

        function elem(element) {

            const nombre = element.title

            res.json({nombre: nombre});
            
        }
    }
})

module.exports = router;