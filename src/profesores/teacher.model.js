import { Schema, model } from "mongoose";

const profesoresSchema = Schema({
    nombre:{
        type: String,
        requiered: [true, "El nombre del profesor es obligatorio"],
        maxLenght: [20, "El nombre no puede exceder los 20 caracteres"]
    },
    apellido:{
        type: String,
        requiered:[true, "El apellido es obligatorio"],
        maxLenght:[20, "El apellido no puede tener mas de 20 caracteres"]
    },
    correo:{
        type: String,
        requiered: [true, "El correo es requerido"],
        unique: true
    },
    contraseña:{
        type: String,
        requiered: [true, "Contraseña requerida"]
    },
    cursosImpartidos: [{
        type: Schema.Types.ObjectId,
        ref: "Cursos"
    }],
    rol:{
        type: String,
        default: "TEACHER_ROL"
    }
})

profesoresSchema.methods.toJSON = function(){
    const {__v, contraseña, correo, _id, ...profesores} = this.toObject()
    profesores.pid = _id
    return profesores
}

export default model("Profesores", profesoresSchema)