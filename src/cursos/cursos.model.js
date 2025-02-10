import { Schema, model } from "mongoose";

/**
 * Esquema de Mongoose para el modelo de Cursos.
 */
const cursosSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del curso es necesario"]
    }
});

/**
 Método para transformar el objeto del curso antes de convertirlo a JSON.
 Elimina las propiedades __v y _id, y agrega una propiedad cid con el valor de _id.
  
 * @returns {Object} - Objeto del curso transformado.
 */
cursosSchema.methods.toJSON = function() {
    const { __v, _id, ...cursos } = this.toObject();
    cursos.cid = _id;
    return cursos;
};

export default model("Cursos", cursosSchema);