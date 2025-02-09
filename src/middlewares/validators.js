import { body, check } from "express-validator";
import { emailExists, usernameExists, EstudentExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
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
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]

export const getEstudentByIdValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(EstudentExists),
    validarCampos,
    deleteFileOnError
]

export const deleteEstudentValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(EstudentExists),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(EstudentExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]
