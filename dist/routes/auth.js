// import { Router } from "express";
// import { verifyToken } from "../middleware/auth.js"; // o .ts si tu config lo permite
// import { AppointmentController } from "../handlers/appointment.js";
// import { body, param } from "express-validator";
// import { handleInputErrors } from "../middleware/index.js";
export {};
// const appointmentRouter = Router();
// appointmentRouter.get("/", verifyToken, AppointmentController.getAppointments);
// appointmentRouter.get(
//   "/:id",
//   verifyToken,
//   param("id").isInt().withMessage("ID no válido"),
//   handleInputErrors,
//   AppointmentController.getAppointmentById
// );
// appointmentRouter.post(
//   "/",
//   verifyToken,
//   body("clientName")
//     .notEmpty().withMessage("El nombre del cliente es obligatorio")
//     .isString().withMessage("El nombre debe ser texto")
//     .isLength({ max: 100 }).withMessage("No puede superar los 100 caracteres"),
//   handleInputErrors,
//   AppointmentController.createAppointment
// );
// export default appointmentRouter;
//# sourceMappingURL=auth.js.map