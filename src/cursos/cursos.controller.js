import Cursos from "../cursos/cursos.model.js";
import Profesor from "../profesores/profesores.model.js";

/**
 * Crea un nuevo curso y lo asocia a un profesor.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const crearCurso = async (req, res) => {
    try {
        const { pid } = req.params;
        const { nombre } = req.body;

        const profesor = await Profesor.findById(pid);
        if (!profesor || profesor.rol !== "TEACHER_ROLE" ){
            return res.status(403).json({ msg: "No autorizado o el profesor no existe." });
        }

        const curso = new Cursos({ nombre, profesor: pid });
        await curso.save();

        profesor.cursosImpartidos.push(curso._id);
        await profesor.save();

        res.status(201).json({ msg: "Curso creado exitosamente", curso });
    } catch (error) {
        console.error("Error en crearCurso:", error);
        res.status(500).json({ error: "Error al crear el curso" });
    }
};

/**
 * Obtiene los cursos impartidos por un profesor.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const getCursosImpartidos = async (req, res) => {
    try {
        const { pid } = req.params;
        const { limite = 4, desde = 0 } = req.query;

        const profesor = await Profesor.findById(pid);
        if (!profesor || profesor.rol !== "TEACHER_ROLE" ){
            return res.status(403).json({ msg: "No autorizado." });
        }

        const query = { _id: { $in: profesor.cursosImpartidos } };

        const [total, cursos] = await Promise.all([
            Cursos.countDocuments(query), // Cuenta el total de cursos
            Cursos.find(query)
                .skip(Number(desde)) // Paginación: desde qué índice empezar
                .limit(Number(limite)) // Paginación: cuántos registros traer
        ]);

        return res.status(200).json({
            success: true,
            total,
            cursos
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos impartidos",
            error: err.message
        });
    }
};

/**
 * Edita el nombre de un curso impartido por un profesor.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const editarCursos = async (req, res) => {
    try {
        const { pid, cid, nuevoNombre } = req.body;

        const profesor = await Profesor.findById(pid);
        if (!profesor || profesor.rol !== "TEACHER_ROLE" ){
            return res.status(403).json({ msg: "No autorizado o el profesor no existe." });
        }
        if (!profesor.cursosImpartidos.includes(cid)) {
            return res.status(403).json({ msg: "No autorizado, el curso no pertenece a este profesor." });
        }

        const curso = await Cursos.findById(cid);
        if (!curso) {
            return res.status(404).json({ msg: "Curso no encontrado" });
        }

        const cursoActualizado = await Cursos.findByIdAndUpdate(
            cid,
            { nombre: nuevoNombre },
            { new: true } 
        );

        return res.status(200).json({
            success: true,
            msg: "Curso actualizado exitosamente",
            curso: cursoActualizado
        });
    } catch (err) {
        console.error("Error en editarCursos:", err);
        res.status(500).json({ 
            success: false, 
            msg: "Error al actualizar el curso" 
        });
    }
};

/**
 * Elimina un curso cambiando su estado a false.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const eliminarCurso = async (req, res) => {
    try {
        const { cid } = req.params;
        
        const user = await Cursos.findByIdAndUpdate(cid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Curso eliminado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        });
    }
};