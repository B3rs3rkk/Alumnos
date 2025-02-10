import { Schema, model } from "mongoose";

/**
 * Esquema de Mongoose para el modelo de Profesores.
 */
const profesoresSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del profesor es obligatorio"],
        maxLength: [20, "El nombre no puede exceder los 20 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        maxLength: [20, "El apellido no puede tener más de 20 caracteres"]
    },
    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    },
    contra: {
        type: String,
        required: [true, "Contraseña requerida"]
    },
    profilePicture: {
        type: String
    },
    cursosImpartidos: [{
        type: Schema.Types.ObjectId,
        ref: "Cursos"
    }],
    rol: {
        type: String,
        default: "TEACHER_ROLE"
    }
});

/**
 * Método para transformar el objeto del profesor antes de convertirlo a JSON.
 * Elimina las propiedades __v, contraseña, y correo, y agrega una propiedad pid con el valor de _id.
 * 
 * @returns {Object} - Objeto del profesor transformado.
 */
profesoresSchema.methods.toJSON = function() {
    const { __v, contraseña, correo, _id, ...profesores } = this.toObject();
    profesores.pid = _id;
    return profesores;
};

export default model("Profesores", profesoresSchema);