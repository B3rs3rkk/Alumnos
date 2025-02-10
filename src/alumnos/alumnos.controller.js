import Alumnos from "./alumnos.model.js";
import Cursos from "../cursos/cursos.model.js";


export const asignarCursoAlumno = async (req, res) => {
    try {
        const { alumnoId } = req.body; 
        const { cursoId } = req.params;

        // Busca al alumno en base a su id
        const alumno = await Alumnos.findById(alumnoId);
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
        if (alumno.cursos.includes(cursoId)) {
            return res.status(400).json({ 
                success: false, 
                msg: "Ya estás inscrito en este curso" 
            });
        }

        // Busca el curso por id
        const curso = await Cursos.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ 
                success: false, 
                msg: "Curso no encontrado" 
            });
        }

        // Agrega el curso al alumno
        alumno.cursos.push(cursoId);
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