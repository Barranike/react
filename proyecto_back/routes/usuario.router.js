const express = require("express")
const router = express.Router() 
const usuariosController = require("../controller/usuarios.controller") //../controller/usuarios.controller

router.post("/login", usuariosController.login)


module.exports = router