import { Router } from "express";
import { cursosValidator } from "../middlewares/validator.js";
import { crearCurso } from "./cursos.controller.js";

const router = Router();

/**
 * Ruta para crear un nuevo curso.
 * 
 * @route POST /crearCurso/:pid
 * @param {Function} cursosValidator - Middleware para validar los datos del curso.
 * @param {Function} crearCurso - Controlador para manejar la creación del curso.
 */
router.post("/crearCurso/:pid", cursosValidator, crearCurso);

export default router;