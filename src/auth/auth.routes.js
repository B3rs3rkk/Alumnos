import { Router } from "express";
import { registerProfesor, login } from "./auth.controller.js";
import { registerValidatorProfesor, loginValidator } from "../middlewares/validator.js";
import { uploadProfilePictureProfesores, uploadProfilePictureAlumnos } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";

const router = Router();

/**
 * Ruta para registrar un profesor.
 * 
 * @route POST /registerProfesor
 * @param {Function} uploadProfilePictureProfesores - Middleware para subir la foto de perfil del profesor.
 * @param {Function} registerValidatorProfesor - Middleware para validar los datos del registro del profesor.
 * @param {Function} deleteFileOnError - Middleware para eliminar el archivo en caso de error.
 * @param {Function} registerProfesor - Controlador para manejar el registro del profesor.
 */
router.post("/registerProfesor", 
    uploadProfilePictureProfesores.single("profilePicture"),
    registerValidatorProfesor, 
    deleteFileOnError,
    registerProfesor
);

/**
 * Ruta para iniciar sesión.
 * 
 * @route POST /login
 * @param {Function} loginValidator - Middleware para validar los datos de inicio de sesión.
 * @param {Function} login - Controlador para manejar el inicio de sesión.
 */
router.post("/login", loginValidator, login);

export default router;