const express = require("express");
const APP = express()
const PORT = 3000

let data = require("./data/usuarios.json")
let { validador } = require("./politica/reglas")

APP.get("/validador",(req,res)=>{
    res.status(200).json(validador(data))
})

APP.get("/validador/con-reglas",(req,res)=>{
    res.status(200).json(validador(data,{reglas: true}))
})

APP.get("/usuarios-correctos",(req,res) =>{
    res.status(200).json(validador(data,{validos: true}))
})


APP.listen(PORT,(e)=>{
    if (!e) return console.log("servidor web corriendo en el puerto ",PORT)

    throw new Error(`ocurrio un error al intentar escuchar el puerto: ${PORT}`)
})