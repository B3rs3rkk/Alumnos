import jwt from "jsonwebtoken";

/**
 * Genera un JWT para profesores.
 * 
 * @param {string} pid - ID del profesor.
 * @returns {Promise<string>} - Promesa que resuelve con el token JWT.
 */
export const generateJWTProfesores = (pid = " ") => {
    return new Promise((resolve, reject) => {
        const payload = { pid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) {
                    reject({
                        success: false,
                        message: err
                    });
                } else {
                    resolve(token);
                }
            }
        );
    });
};

/**
 * Genera un JWT para alumnos.
 * 
 * @param {string} aid - ID del alumno.
 * @returns {Promise<string>} - Promesa que resuelve con el token JWT.
 */
export const generateJWTAlumnos = (aid = " ") => {
    return new Promise((resolve, reject) => {
        const payload = { aid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) {
                    reject({
                        success: false,
                        message: err
                    });
                } else {
                    resolve(token);
                }
            }
        );
    });
};