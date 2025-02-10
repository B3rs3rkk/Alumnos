import bcrypt from "bcrypt";
import Profesores from "../profesores/profesores.model.js";
import Alumnos from "../alumnos/alumnos.model.js";
import { generateJWTProfesores, generateJWTAlumnos } from "../helpers/generate-jwt.js";


export const registerUsuario = async (req, res) => {
    try {
        const data = req.body;
        const profilePicture = req.file ? req.file.filename : null;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        data.password = hashedPassword;
        data.profilePicture = profilePicture;

        let usuario;
        if (data.role === "STUDENT_ROLE") {
            // Crear el usuario como estudiante
            usuario = await Alumnos.create({
                ...data, // Toma todos los datos del body
                carnet: data.carnet || "", // Asegura que siempre tenga un valor
                cursos: data.cursos || [] // Array vacío si no se envían cursos
            });
        } else {
            // Crear el usuario como profesor (TEACHER_ROLE por defecto)
            usuario = await Profesores.create(data);
        }

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            nombre: usuario.nombre,
            apellido: usuario.apellido
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
};

/**
 * Inicia sesión de un usuario (profesor o alumno).
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const profesor = await Profesores.findOne({ email });
        const alumno = await Alumnos.findOne({ email });

        if (!profesor && !alumno) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe un usuario con esas credenciales"
            });
        }

        if (profesor) {
            const isPasswordValid = await bcrypt.compare(password, profesor.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Credenciales inválidas",
                    error: "Contraseña incorrecta"
                });
            }
            const token = await generateJWTProfesores(profesor.id);
            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                userDetails: {
                    token: token,
                    profilePicture: profesor.profilePicture
                }
            });
        }

        if (alumno) {
            const isPasswordValid = await bcrypt.compare(password, alumno.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Credenciales inválidas",
                    error: "Contraseña incorrecta"
                });
            }
            const token = await generateJWTAlumnos(alumno.id);
            return res.status(200).json({
                message: "Inicio de sesión exitoso",
                userDetails: {
                    token: token,
                    profilePicture: alumno.profilePicture
                }
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        });
    }
};