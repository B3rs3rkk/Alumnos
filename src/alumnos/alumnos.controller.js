import Alumnos from "./alumnos.model.js";
import Cursos from "../cursos/cursos.model.js";

/**
 * Asigna un curso a un alumno.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const asignarCursoAlumno = async (req, res) => {
    try {
        const { aid } = req.body; 
        const { cid } = req.params;

        // Busca al alumno en base a su id
        const alumno = await Alumnos.findById(aid);
        console.log(alumno)
        if (!alumno) {
            return res.status(404).json({ 
                success: false, 
                msg: "Alumno no encontrado" 
            });
        }
        // Verifica si el alumno ya está inscrito en 3 cursos
        if (alumno.cursos.length >= 3) {
            return res.status(400).json({ 
                success: false, 
                msg: "No puedes inscribirte a más de 3 cursos" 
            });
        }

        // Verifica si el alumno ya está inscrito en el curso
        if (alumno.cursos.includes(cid)) {
            return res.status(400).json({ 
                success: false, 
                msg: "Ya estás inscrito en este curso" 
            });
        }

        // Busca el curso por id
        const curso = await Cursos.findById(cid);
        if (!curso) {
            return res.status(404).json({ 
                success: false, 
                msg: "Curso no encontrado" 
            });
        }

        // Agrega el curso al alumno
        alumno.cursos.push(cid);
        await alumno.save();
        // Respuesta exitosa
        res.status(200).json({
            success: true,
            msg: "Te has inscrito exitosamente al curso",
        });

    } catch (error) {
        console.error("Error en asignarCursoAlumno:", error);
        res.status(500).json({ 
            success: false, 
            msg: "Error al inscribirse en el curso" 
        });
    }
};