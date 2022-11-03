const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const objEschema = mongoose.Schema

const eschemaUsuario = new objEschema({
    nombre: String,
    email: String,
    telefono: String,
    password: String,
    idusuario: String
})


const ModeloUsuario = mongoose.model('usuarios',eschemaUsuario) // Reemplazar "users" por el nombre de la tabla de la DB 
module.exports = router

//ruta de prueba
router.get('/ejemplo', (req,res)=>{
    res.end('Carga exitosa desde ruta ejemplo')
    
})// Correr explorador con http://localhost:3500/api/usuarioModel/ejemplo

// API para agregar nuevos usuarios
router.post('/agregarusuario',(req, res) =>{
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        idusuario: req.body.idusuario 
        })
    nuevousuario.save(function(err){
        if(!err){
            res.send('Usuario agregado Correctamente')
        }else{
            res.send(err)
        }
    })
})

//API para obtener los usuarios
router.get('/obtenerusuarios', (req, res) =>{
   ModeloUsuario.find({}, function(docs,err){
    if(!err){
        res.send(docs)
    }else{
        res.send(err)
    }
   })
})

//API para obtener el usuario a editar
router.post('/obtenerdatausuario', (req, res) =>{
    ModeloUsuario.find({idusuario:req.body.idusuario}, function(docs,err){
     if(!err){
         res.send(docs)
     }else{
         res.send(err)
     }
    })
 })

router.post('/actualizausuario',(req, res) =>{
   ModeloUsuario.findOneAndUpdate({idusuario:req.body.idusuario},{
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    password: req.body.password
   
   }, (err) =>{
        if(!err){
            res.send('Usuario Actualizado correctamente')
            
        }else{
            res.send(err)
           
        }
   })
})

router.post('/borrarusuario',(req, res) =>{
    ModeloUsuario.findOneAndDelete({idusuario:req.body.idusuario},(err) =>{
        if(!err){
            res.send('Usuario Eliminado correctamente')
        }else{
            res.send(err)
        }
    })
 })

