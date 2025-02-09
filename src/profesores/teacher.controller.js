import { hash } from "argon2";
import Estudent from "./teacher.model.js";

export const getEstudentById = async (req, res) =>{
    try{
        const {pid} = req.params;
        const estudent = await Estudent.findById(pid)

        if(!estudent){
            return res.status(404).json({
                success: false,
                message: "alumno no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            Estudent
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener al alumno",
            error: err.message
        })
    }
}

export const getEstudent = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, estudent ] = await Promise.all([
            Estudent.countDocuments(query),
            Estudent.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const deleteEstudent = async (req, res) => {
    try{
        const { uid } = req.params
        
        const user = await Estudent.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

