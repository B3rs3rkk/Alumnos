'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors()) 
    app.use(helmet())
    app.use(morgan("dev"))
}
