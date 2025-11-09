import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { TaskController } from "../handlers/TaskAppointment.js"; // O "../controllers/TaskController.js" según tu estructura
const taskRouter = Router();
//get all appointment tasks
taskRouter.get("/appointment/:appointmentId/tasks", param("appointmentId")
    .isInt()
    .withMessage("El ID de la cita debe ser un número entero"), handleInputErrors, TaskController.getTasks);
//get an specific appointment task
taskRouter.get("/appointment/:appointmentId/tasks/:id", param("appointmentId").isInt(), param("id").isInt(), handleInputErrors, TaskController.getTaskById);
taskRouter.post("/appointment/:appointmentId/tasks", param("appointmentId")
    .isInt()
    .withMessage("El ID de la cita debe ser un número entero"), body("name")
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"), body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto"), body("status")
    .optional()
    .isIn(["pendiente", "en_proceso", "completada", "retrasada", "cancelada"])
    .withMessage("Estado no válido"), handleInputErrors, TaskController.createTask);
taskRouter.put("/appointment/:appointmentId/tasks/:id", param("appointmentId").isInt(), param("id").isInt(), body("name").optional().isString(), body("description").optional().isString(), body("status")
    .optional()
    .isIn(["pendiente", "en_proceso", "completada", "retrasada", "cancelada"]), handleInputErrors, TaskController.updateTask);
taskRouter.delete("/appointment/:appointmentId/tasks/:id", param("appointmentId").isInt(), param("id").isInt(), handleInputErrors, TaskController.deleteTask);
// Actualizar solo el estado de una tarea
taskRouter.patch("/appointment/:appointmentId/tasks/:id/status", param("appointmentId").isInt(), param("id").isInt(), body("status")
    .notEmpty()
    .isIn(["pendiente", "en_proceso", "completada", "retrasada", "cancelada"]), handleInputErrors, TaskController.updateStatus);
export default taskRouter;
//# sourceMappingURL=appointmentTask.router.js.map