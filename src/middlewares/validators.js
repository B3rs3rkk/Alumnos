import { body } from "express-validator";
import { correoAlumnoExists, correoProfesorExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidatorProfesor = [
    body("nombre").not().isEmpty().withMessage("El nombre es requerido"),
    body("apellido").not().isEmpty().withMessage("El apellido es requerido"),
    body("correo").not().isEmpty().withMessage("El correo es requerido"),
    body("correo").isEmail().withMessage("Correo invalido"),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos
]

export const loginValidator = [
    body("correo").optional().isEmail().withMessage("Correo invalido"),
    validarCampos
]

export const cursosValidator =[
    body("nombre").not().isEmpty().withMessage("El nombre es requerido")
]
