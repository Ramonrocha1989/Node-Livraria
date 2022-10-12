import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        id: { type: String },
        nome: { type: String, required: true },
        email: { type: String, required: true },
        senha: {type: String, required: true}
    },
    {
        versionKey: false
    }
)
const usuario = mongoose.model("usuario", UsuarioSchema)

export default usuario;