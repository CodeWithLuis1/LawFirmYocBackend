import { Request, Response } from "express";
import ServiceCategory from "../models/ServiceCategory.js";
import LegalService from "../models/LegalServices.model.js";

// Crear una nueva categoría de servicios
export const createServiceCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        statusCode: 400,
        error: "El nombre de la categoría es obligatorio",
      });
    }

    // Verificar duplicado
    const categoryExists = await ServiceCategory.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(409).json({
        statusCode: 409,
        error: "La categoría ya existe",
      });
    }

    await ServiceCategory.create({ name });
    res.status(200).json({
      statusCode: 200,
      message: "Categoría creada correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al crear la categoría",
      details: error.message,
    });
  }
};

// Obtener todas las categorías (con servicios)
export const getServiceCategories = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;

    let categories;
    let total;
    let lastPage = 1;

    if (limit !== null) {
      const offset = (page - 1) * limit;
      total = await ServiceCategory.count();
      categories = await ServiceCategory.findAll({
        limit,
        offset,
        order: [["id_category", "ASC"]],
        include: [{ model: LegalService, as: "legalServices" }],
      });
      lastPage = Math.ceil(total / limit);
    } else {
      categories = await ServiceCategory.findAll({
        order: [["id_category", "ASC"]],
        include: [{ model: LegalService, as: "legalServices" }],
      });
      total = categories.length;
    }

    res.json({
      statusCode: 200,
      data: categories,
      total,
      limit,
      lastPage,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener las categorías",
      details: error.message,
    });
  }
};

// Obtener categoría por ID
export const getServiceCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await ServiceCategory.findByPk(id, {
      include: [{ model: LegalService, as: "legalServices" }],
    });

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: "Categoría no encontrada",
      });
    }

    res.json({
      statusCode: 200,
      data: category,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener la categoría",
      details: error.message,
    });
  }
};

// Actualizar categoría
export const updateServiceCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await ServiceCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        message: "Categoría no encontrada",
      });
    }

    if (name && name !== category.name) {
      const exists = await ServiceCategory.findOne({ where: { name } });
      if (exists) {
        return res.status(409).json({
          statusCode: 409,
          message: "Ya existe una categoría con ese nombre",
        });
      }
    }

    await category.update({ name: name ?? category.name });
    res.json({
      statusCode: 200,
      message: "Categoría actualizada correctamente",
      data: category,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar la categoría",
      error: error.message,
    });
  }
};

// Eliminar categoría
export const deleteServiceCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await ServiceCategory.findByPk(id, {
      include: [{ model: LegalService, as: "legalServices" }],
    });

    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        message: "Categoría no encontrada",
      });
    }

    if (category.legalServices && category.legalServices.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "No se puede eliminar una categoría con servicios asociados",
      });
    }

    await category.destroy();
    res.json({
      statusCode: 200,
      message: "Categoría eliminada correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar la categoría",
      error: error.message,
    });
  }
};
