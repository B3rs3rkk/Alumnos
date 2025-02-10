'use strict'

import mongoose from "mongoose";

/**
 * Establece la conexión con la base de datos MongoDB.
 * 
 * @returns {Promise<void>} - Promesa que resuelve cuando la conexión es exitosa.
 */
export const dbConnection = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("MongoDB  | could not be connect to MongoDB");
            mongoose.disconnect();
        });
        mongoose.connection.on("connecting", () => {
            console.log("MongoDB | try connecting");
        });
        mongoose.connection.on("connected", () => {
            console.log("MongoDB | connected to MongoDB");
        });
        mongoose.connection.on("open", () => {
            console.log("MongoDB | Connected to Database");
        });
        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB | reconnected to MongoDB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB | disconnected to MongoDB");
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 1000,
            maxPoolSize: 50
        });
    } catch (err) {
        console.log(`Database connection failed : ${err}`);
    }
};