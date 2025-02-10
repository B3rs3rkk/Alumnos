import Profesores from "./profesores.model.js";

/**
 * Obtiene un profesor por su ID.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Respuesta HTTP con el resultado de la operación.
 */
export const getProfesorById = async (req, res) => {
    try {
        // Extrae el ID del profesor de los parámetros de la solicitud
        const { pid } = req.params;
        // Busca al profesor por su ID
        const profes = await Profesores.findById(pid);

        // Verifica si el profesor existe
        if (!profes) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        // Responde con los datos del profesor encontrado
        res.status(200).json({
            success: true,
            profes
        });
    } catch (err) {
        // Maneja cualquier error que ocurra durante el proceso
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err.message
        });
    }
};