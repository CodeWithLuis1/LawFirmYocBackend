import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { AppointmentController } from "../handlers/appointment.js";
const appointmentRouter = Router();
// Obtener todos
appointmentRouter.get("/", AppointmentController.getAppointments);
// Obtener por ID
appointmentRouter.get("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, AppointmentController.getAppointmentById);
// Crear cita
appointmentRouter.post("/", body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio")
    .isString()
    .withMessage("El nombre del cliente debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El nombre del cliente no puede superar los 100 caracteres"), handleInputErrors, AppointmentController.createAppointment);
appointmentRouter.put("/:id", param("id").isInt().withMessage("ID no válido"), body("clientName")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"), body("clientEmail")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido"), body("clientPhone")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser texto")
    .isLength({ max: 20 })
    .withMessage("El teléfono no puede superar los 20 caracteres"), body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe estar en formato YYYY-MM-DD"), body("appointmentTime")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .withMessage("La hora debe estar en formato HH:MM o HH:MM:SS"), body("reason")
    .optional()
    .isString()
    .withMessage("La razón debe ser texto")
    .isLength({ max: 255 })
    .withMessage("La razón no puede superar los 255 caracteres"), handleInputErrors, AppointmentController.updateAppointment);
appointmentRouter.delete("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, AppointmentController.deleteAppointment);
export default appointmentRouter;
//# sourceMappingURL=appointment.router.js.map