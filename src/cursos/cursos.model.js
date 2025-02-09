import { Schema, model } from "mongoose";

const cursosSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre del curso es necesario"]
    }
})

export default model("Cursos", cursosSchema)