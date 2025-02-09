import { Router } from "express"
import { getEstudentById,getEstudent, deleteEstudent} from "./user.controller.js"
import { getEstudentByIdValidator, deleteEstudentValidator} from "../middlewares/validators.js"

const router = Router()

router.get("/findUser/:uid", getEstudentByIdValidator, getEstudentById)

router.get("/", getEstudent)

router.delete("/deleteUser/:uid", deleteEstudentValidator, deleteEstudent)


export default router
