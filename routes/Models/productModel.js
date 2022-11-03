const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const objEschema = mongoose.Schema



const eschemaProducto = new objEschema({
    nombre: String,
    descripcion: String,
    stock: Number,
    precio: Number,
    idproducto: String
})

const ModeloProducto = mongoose.model('products',eschemaProducto)
module.exports = router

//ruta de prueba
router.get('/login', (req,res)=>{
    res.end('Carga exitosa desde ruta ejemplo')
    
})

router.post('/obtenerdataproducto', (req, res) =>{
    ModeloProducto.find({idproducto:req.body.idproducto}, function(docs,err){
     if(!err){
         res.send(docs)
     }else{
         res.send(err)
     }
    })
 })


router.post('/actualizarproducto',(req, res) =>{
    ModeloProducto.findOneAndUpdate({idproducto:req.body.idproducto},{
     nombre: req.body.nombre,
     descripcion: req.body.descripcion,
     stock: req.body.stock,
     precio: req.body.precio
    
    }, (err) =>{
         if(!err){
             res.send('Prodcuto Actualizado correctamente')
            
         }else{
             res.send(err)
         }
    })
 })

router.post('/agregarproducto',(req, res) =>{
    const nuevoproducto = new ModeloProducto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        idproducto: req.body.idproducto 
    })
    nuevoproducto.save(function(err){
        if(!err){
            res.send('Producto agregado Correctamente')
        }else{
            res.send(err)
        }
    })
 })
 
 router.get('/obtenerproductos', (req, res) =>{
    ModeloProducto.find({}, function(docs,err){
     if(!err){
         res.send(docs)
     }else{
         res.send(err)
     }
    })
 })
 
router.post('/borrarproducto',(req, res) =>{
	ModeloProducto.findOneAndDelete({idproducto:req.body.idproducto},(err) =>{
		if(!err){
			res.send('Producto Eliminado correctamente')
		}else{
			res.send(err)
		}
	})
})