import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import {ServiceController} from "../handlers/legalServices.js"


const serviceRouter = Router();

// Obtener todos los servicios
serviceRouter.get("/", ServiceController.getServices);

// Obtener un servicio por ID
serviceRouter.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  ServiceController.getServiceById
);

// Crear servicio
serviceRouter.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del servicio es obligatorio")
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),
  body("category")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isString()
    .withMessage("La categoría debe ser texto")
    .isLength({ max: 50 })
    .withMessage("La categoría no puede superar los 50 caracteres"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isDecimal()
    .withMessage("El precio debe ser un número decimal"),
  body("duration")
    .notEmpty()
    .withMessage("La duración es obligatoria")
    .isString()
    .withMessage("La duración debe ser texto")
    .isLength({ max: 50 })
    .withMessage("La duración no puede superar los 50 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto"),
  body("status")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn(["Activo", "Pausado"])
    .withMessage("El estado debe ser 'Activo' o 'Pausado'"),
  handleInputErrors,
  ServiceController.createService
);

// Actualizar servicio
serviceRouter.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),
  body("category")
    .optional()
    .isString()
    .withMessage("La categoría debe ser texto")
    .isLength({ max: 50 })
    .withMessage("La categoría no puede superar los 50 caracteres"),
  body("price")
    .optional()
    .isDecimal()
    .withMessage("El precio debe ser un número decimal"),
  body("duration")
    .optional()
    .isString()
    .withMessage("La duración debe ser texto")
    .isLength({ max: 50 })
    .withMessage("La duración no puede superar los 50 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto"),
  body("status")
    .optional()
    .isIn(["Activo", "Pausado"])
    .withMessage("El estado debe ser 'Activo' o 'Pausado'"),
  handleInputErrors,
  ServiceController.updateService
);

// Eliminar servicio
serviceRouter.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  ServiceController.deleteService
);

export default serviceRouter;
