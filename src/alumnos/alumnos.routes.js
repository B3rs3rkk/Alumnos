import { Router } from "express";
import { asignarCursoAlumno } from "./alumnos.controller.js";

const router = Router();

/**
 * Ruta para asignar un curso a un alumno.
 * 
 * @route POST /asignarAlumno/:cid
 * @param {Function} asignarCursoAlumno - Controlador para manejar la asignación del curso al alumno.
 */
router.post("/asignarAlumno/:cid", asignarCursoAlumno);

export default router;