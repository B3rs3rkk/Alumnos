import { Schema, model  } from "mongoose";

const alumnosSchema = Schema({
    nombre:{
        type: String,
        requiered: [true, "El nombre es requerido"],
        maxLenght: [20, "El nombre no puede exceder los 20 caracteres"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLenght: [20, "El apellido no puede sobrepasar los 20 caracteres"]
    },
    carnet:{
        type: String,
        required: [true, "El carnet del alumno es necesario"],
        minLenght: [7, "El minimo de numeros del carnet es de 7 numeros"],
        maxLenght:[7, "El maximo de numeros del carnet es de 7 numeros "]
    },
    correo:{
        type: String,
        requiered: [true, "El correo es requerido"],
        unique: true
    },
    contra:{
        type: String,
        requiered: [true, "Contraseña requerida"]
    },
    cursos:[{ 
        type: Schema.Types.ObjectId, 
        ref: "Cursos" 
    }],
    rol:{
        type: String,
        default: "STUDENT_ROL"
    }
})

alumnosSchema.methods.toJSON = function(){
    const {__v, contraseña, correo, _id, ...alumnos} = this.toObject()
    alumnos.aid = _id
    return alumnos
}

export default model("Alumnos", alumnosSchema)