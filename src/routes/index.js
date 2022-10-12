import express from "express";
import login from "./loginRoutes.js"
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import usuarios from "./usuarioRoutes.js";
import loginMiddleware from "../middleware/login_middleware.js"


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Curso de node" })
    })

    app.use(
        express.json(),
        express.urlencoded({extended: true}),       
        //loginMiddleware.valid(),
        login,
        livros,
        autores,
        usuarios
    )
};

export default routes;
