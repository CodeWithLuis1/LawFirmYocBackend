import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// Modelos
import User from "../models/User.model.js";
import Contract from "../models/Contract.model.js";
import Appointment from "../models/Appointment.model.js";
import AppointmentTasks from "../models/AppointmentTasks.model.js";
import Service from "../models/LegalServices.model.js";
import Role from "../models/Rol.model.js";
import ServiceCategory from "../models/ServiceCategory.js";
dotenv.config();
// ✅ Obtener __dirname en entorno ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ✅ Inicializar Sequelize
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    models: [join(__dirname, "../models")],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // importante en Render
        },
    },
    logging: false, // opcional, para no llenar la consola
});
// ✅ Registrar modelos manualmente (esto evita problemas de dependencias circulares)
db.addModels([
    User,
    Contract,
    Appointment,
    AppointmentTasks,
    Service,
    Role,
    ServiceCategory,
]);
// ✅ Definir asociaciones aquí (fuera de los modelos)
Appointment.hasMany(AppointmentTasks, { foreignKey: "appointmentId" });
AppointmentTasks.belongsTo(Appointment, { foreignKey: "appointmentId" });
// Si tienes más relaciones, las defines aquí de igual forma:
// Contract.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Contract, { foreignKey: "userId" });
export default db;
//# sourceMappingURL=db.js.map