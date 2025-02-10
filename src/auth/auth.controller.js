import bcrypt from "bcrypt";
import Profesores from "../profesores/profesores.model.js"
import Alumnos from "../alumnos/alumnos.model.js"
import { generateJWTProfesores, generateJWTAlumnos } from "../helpers/generate-jwt.js"
import { token } from "morgan";

export const registerProfesor = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const saltos = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(data.contra, saltos)
        data.contra = encryptedPassword
        data.profilePicture = profilePicture

        let usuario;
        if (data.rol === "STUDENT_ROLE") {
            // Crear el usuario como estudiante
            usuario = await Alumnos.create({
                ...data, // Toma todos los datos del body
                carnet: data.carnet || "", // Asegura que siempre tenga un valor
                crusos: data.cursos || [] // Array vacío si no se envían cursos
            });
        } else {
            // Crear el usuario como profesor (TEACHER_ROLE por defecto)
            usuario = await Profesores.create(data);
        }

        return res.status(201).json({
            message: "El Usuario a sido registrado",
            nombre: usuario.nombre,
            apellido: usuario.apellido
            
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al agregar el profesor",
            error: err.message
        });
    }
}


export const login = async (req, res) => {
    const { correo, contra } = req.body
    try{
        const profesor = await Profesores.findOne({correo})
        const alumno = await Alumnos.findOne({correo})
  
        if(!profesor && !alumno){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe un usuario con esas credenciales"
            })
        }

        if (profesor){
            const contraseñaValida1 = await bcrypt.compare(contra, profesor.contra);
            if (!contraseñaValida1) {
                return res.status(400).json({
                    message: "Credenciales inválidas",
                    error: "Contraseña incorrecta"
                });
            }
            const token = await generateJWTProfesores(profesor.id);
            return res.status(200).json({
                message: "Login successful",
                userDetails: {
                    token: token,
                    profilePicture: profesor.profilePicture
                }
            });
        }

        if (alumno){
            const contraseñaValida2 = await bcrypt.compare(contra, alumno.contra);
            if (!contraseñaValida2) {
                return res.status(400).json({
                    message: "Credenciales inválidas",
                    error: "Contraseña incorrecta"
                });
            }
            const token = await generateJWTAlumnos(alumno.id);
            return res.status(200).json({
                message: "Login successful",
                userDetails: {
                    token: token,
                    profilePicture: alumno.profilePicture
                }
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};
