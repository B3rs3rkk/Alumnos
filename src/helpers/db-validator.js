import Profesor from "../profesores/profesores.model.js";
import Alumno from "../alumnos/alumnos.model.js";

/**
 * Verifica si el correo de un profesor ya está registrado en la base de datos.
 * 
 * @param {string} correo - Correo electrónico del profesor.
 * @throws {Error} - Si el correo ya está registrado.
 */
export const correoProfesorExists = async (correo = "") => {
    const existe = await Profesor.findOne({ correo });
    if (existe) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

/**
 * Verifica si el correo de un alumno ya está registrado en la base de datos.
 * 
 * @param {string} correo - Correo electrónico del alumno.
 * @throws {Error} - Si el correo ya está registrado.
 */
export const correoAlumnoExists = async (correo = "") => {
    const existe = await Alumno.findOne({ correo });
    if (existe) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};