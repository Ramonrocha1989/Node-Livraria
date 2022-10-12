import usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


class UsuarioController {

    static listarUsuarios = (req, res) => {
        usuario.find({}, (err, usuarios) => {
            if (err) {
                res.status(500).json({ Erro: err })
            }
            else {
                res.status(200).json(usuarios);
            }
        })
    }

    static listarUsuarioPorId = (req, res) => {
        const id = req.params.id;

        usuario.findById(id, (err, usuarioEncontrado) => {
            if (err) {
                res.status(500).json({ Erro: err });
            }
            else if (usuarioEncontrado) {
                return res.json(usuarioEncontrado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Usuario nao encontrado" }
                )
            }

        })
    }

    static cadastroUsuario = (req, res) => {
        const usuarioReq = req.body;
        if (usuarioReq && usuarioReq.nome
            && usuarioReq.email && usuarioReq.senha) {

            const usuarioNovo = new usuario(usuarioReq);
            console.log("Senha 1", usuarioNovo.senha);
            usuarioNovo.senha = bcrypt.hashSync(usuarioReq.senha, 10);
            console.log("Senha 2", usuarioNovo.senha);

            usuarioNovo.save((err, usuarioSalvo) => {
                if (err) {
                    res.status(500).json({ Erro: err })
                }
                else {
                    return res.status(201).json(usuarioSalvo);
                }
            })

        }
        else {
            return res.status(400).json({
                Erro: "Nome, email e/ou senha sao obrigatorios"
            })
        }
    }

    static atualizarUsuario = (req, res) => {
        const id = req.params.id;
        const usuarioReq = req.body;

        if (!usuarioReq || !usuarioReq.nome
            || !usuarioReq.email) {
            return res.status(400).json({
                Erro: "Nome e/ou email sao obrigatorios"
            });
        }
        if (usuarioReq.senha) {
            usuarioReq.senha = bcrypt.hashSync(usuarioReq.senha, 10);
        }

        usuario.findByIdAndUpdate(id, usuarioReq, { new: true },
            (err, usuarioAtualizado) => {
                if (err) {
                    res.status(500).json({ Erro: err });
                }
                else if (usuarioAtualizado) {
                    return res.json(usuarioAtualizado);
                }
                else {
                    return res.status(404).json(
                        { Erro: "Usuario nao encontrado" }
                    )
                }
            })
    }

    static deletarUsuario = (req, res) => {
        const id = req.params.id;

        usuario.findByIdAndDelete(id, (err, usuarioDeletado) => {
            if (err) {
                return res.status(500).json({ Erro: err });
            }
            else if (usuarioDeletado) {
                return res.json(usuarioDeletado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Usuario nao encontrado" }
                )
            }
        })
    }

    static buscarUsuario = (req, res) => {
        if (req.query && req.query.email) {
            const paramEmail = req.query.email;
            usuario.findOne({ email: paramEmail }, (err, usuarioEncontrado) => {
                if (err) {
                    return res.status(500).json({ Erro: err });
                }
                else if (usuarioEncontrado) {
                    return res.json(usuarioEncontrado);
                }
                else {
                    return res.status(404).json(
                        { Erro: "Usuario nao encontrado" }
                    )
                }
            })
        }
        else {
            res.status(400).json({ Erro: "Faltou o parametro email" });
        }
    }

    static validarUsuario = (req, res) => {
        if (req.body && req.body.email && req.body.senha) {
            const emailUsuario = req.body.email;
            const senhaUsuario = req.body.senha;

            usuario.findOne({ email: emailUsuario }, (err, usuarioEncontrado) => {
                if (err) {
                    return res.status(500).json({ Erro: err });
                }
                else if (usuarioEncontrado && bcrypt.compareSync(senhaUsuario, usuarioEncontrado.senha)) {
                    const token = jwt.sign({
                        id: usuarioEncontrado.id
                    }, 'Sen@crs', { expiresIn: "1h" });
                    res.status(201).json({ token: token });
                }
                else {
                    res.status(401).json({ Erro: "Usuario ou senha invalidos" });
                }
            })
        }
        else {
            res.status(400).json({ Erro: "Parametros invalidos" });
        }
    }

}

export default UsuarioController