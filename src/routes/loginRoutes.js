import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const router = express.Router();

router.post('/login', UsuarioController.validarUsuario);

export default router;