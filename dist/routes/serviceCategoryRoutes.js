import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/index.js";
import { createServiceCategory, getServiceCategories, getServiceCategoryById, updateServiceCategory, deleteServiceCategory, } from "../handlers/serviceCategoryHandler.js";
const serviceCategoryRouter = Router();
// Obtener todas las categorías de servicios
serviceCategoryRouter.get("/", getServiceCategories);
// Obtener categoría por ID
serviceCategoryRouter.get("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, getServiceCategoryById);
// Crear una nueva categoría
serviceCategoryRouter.post("/", body("name").notEmpty().withMessage("El nombre de la categoría es obligatorio"), handleInputErrors, createServiceCategory);
// Actualizar una categoría
serviceCategoryRouter.patch("/:id", param("id").isInt().withMessage("ID no válido"), body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"), handleInputErrors, updateServiceCategory);
// Eliminar una categoría
serviceCategoryRouter.delete("/:id", param("id").isInt().withMessage("ID no válido"), handleInputErrors, deleteServiceCategory);
export default serviceCategoryRouter;
//# sourceMappingURL=serviceCategoryRoutes.js.map