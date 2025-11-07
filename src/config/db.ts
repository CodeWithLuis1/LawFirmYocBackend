import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from "../models/User.model.js";
import Contract from "../models/Contract.model.js";
import Appointment from "../models/Appointment.model.js";
import Service from "../models/LegalServices.model.js";
import Task from "../models/AppointmentTasks.model.js"
import Role from "../models/Rol.model.js";
import ServiceCategory from "../models/ServiceCategory.js";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [join(__dirname, '../models/*.ts')]
})
 db.addModels([User, Contract, Appointment, Service,Task,Role,ServiceCategory]);
export default db