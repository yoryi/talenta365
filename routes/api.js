const express = require('express');
const router = express.Router();
const Axios = require('axios');
require('dotenv').config()

router.post('/Swapi', async (req, res) => {

    //ES6 HTTP AXIOS CON VARIABLE URL
    const peticion = async (api, data) => {
        await Axios.get(`https://swapi.dev/api/${api}`)
            .then(data)
    };

    //ES6 HTTP SIN VARIABLE URL PARA ESPECIE
    const peticion2 = async (api, data) => {
        await Axios.get(api)
            .then(data)
    };

    //Creamos Promesas
    let nombre = new Promise(function (data) {
        peticion('films', respuesta => data(respuesta.data['results']))
    });

    let planetas = new Promise(function (data) {
        peticion('planets', respuesta => data(respuesta.data['results']))
    });

    let actores = new Promise(function (data) {
        peticion('people', respuesta => data(respuesta.data['results']))
    });

    let naves = new Promise(function (data) {
        peticion('starships', respuesta => data(respuesta.data['results']))
    });

    //Retornamos Promesas anidadas
    nombre.then(function (nombre) {

        //Nombres
        const nombres = nombre.map(e => e.title)

        //Planetas
        planetas.then(function (planetas) {
            const Map_planetas = planetas.map(e => {
                const name = e.name
                const gravedad = e.gravity
                const diametro = e.diameter
                const poblacion = e.population
                return ({ nombre: name, gravedad: gravedad, diametro: diametro, poblacion: poblacion })
            })

            //Actores
            actores.then(function (actores) {
                const Map_Actores = actores.map(e => {
                    const nombre = e.name
                    const genero = e.gender
                    const color_cabello = e.hair_color
                    const color_piel = e.skin_color
                    const color_ojos = e.eye_color
                    const estatura = e.height
                    const nombre_planeta = e.homeworld
                    const especie = e.species
                    return ({ nombre: nombre, genero: genero, color_cabello: color_cabello, color_piel: color_piel, color_ojos: color_ojos, estatura: estatura, nombre_planeta: nombre_planeta, especie: especie })
                })

                //Naves Espaciales
                naves.then(function (naves) {
                    const Map_Naves = naves.map(e => {
                        const nombre = e.name
                        const modelo = e.model
                        const fabricante = e.manufacturer
                        const numero_pasajero = e.passengers
                        return ({ nombre: nombre, modelo: modelo, fabricante: fabricante, numero_pasajero: numero_pasajero })
                    })

                    //RESULTADO
                    res.json({ nombre: nombres, planetas: Map_planetas, actores: Map_Actores, naves: Map_Naves })

                })
            })
        });
    })
})

module.exports = router;