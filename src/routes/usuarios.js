var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js - 19/07
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/Salvar/:idUsuario", function (req, res) {
    usuarioController.Salvar(req, res);
});

router.post("/Rank", function (req, res) {
    usuarioController.Rank(req, res);
    // Aqui ele apenas passa os valores de Req e Res para o UsuarioController quando necessário. - 19/07
});

module.exports = router;