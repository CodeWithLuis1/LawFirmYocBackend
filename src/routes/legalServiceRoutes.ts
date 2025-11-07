import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {
  createLegalService,
  getLegalServices,
  getLegalServiceById,
  updateLegalService,
  deleteLegalService,
} from "../handlers/legalServiceHandler.js";

const legalServiceRouter = Router();

// Obtener todos los servicios legales
legalServiceRouter.get("/", getLegalServices);

// Obtener servicio por ID
legalServiceRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getLegalServiceById
);

// Crear nuevo servicio legal
legalServiceRouter.post(
  "/",
  body("name").notEmpty().withMessage("El nombre del servicio es obligatorio"),
  body("id_category").isInt().withMessage("El ID de la categoría debe ser numérico"),
  body("price").isNumeric().withMessage("El precio debe ser numérico"),
  body("duration").isInt().withMessage("La duración debe ser un número entero"),
  handleInputErrors,
  createLegalService
);

// Actualizar servicio legal
legalServiceRouter.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("id_category").optional().isInt().withMessage("El ID de la categoría debe ser numérico"),
  body("price").optional().isNumeric().withMessage("El precio debe ser numérico"),
  body("duration").optional().isInt().withMessage("La duración debe ser un número entero"),
  body("status").optional().isBoolean().withMessage("El estado debe ser verdadero o falso"),
  handleInputErrors,
  updateLegalService
);

// Eliminar servicio legal
legalServiceRouter.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteLegalService
);

export default legalServiceRouter;
