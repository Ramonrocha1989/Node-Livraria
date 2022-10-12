import express from "express";
import UsuarioController from "../controllers/usuariosController.js";


const router = express.Router();

router
    .get("/usuario", UsuarioController.listarUsuarios)
    .get("/usuario/:id", UsuarioController.listarUsuarioPorId)
    .post("/usuario", UsuarioController.cadastroUsuario)
    .put("/usuario/:id", UsuarioController.atualizarUsuario)
    .delete("/usuario/:id", UsuarioController.deletarUsuario)

export default router;