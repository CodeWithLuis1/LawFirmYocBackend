import { Request, Response } from "express";
import LegalService from "../models/LegalServices.model.js";
import ServiceCategory from "../models/ServiceCategory.js";

// Crear un nuevo servicio legal
export const createLegalService = async (req: Request, res: Response) => {
  try {
    const { name, id_category, price, duration, description, status } = req.body;

    if (!name || !id_category || !price || !duration) {
      return res.status(400).json({
        statusCode: 400,
        error: "Campos obligatorios: name, id_category, price, duration",
      });
    }

    const category = await ServiceCategory.findByPk(id_category);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        error: "La categoría asociada no existe",
      });
    }

    const exists = await LegalService.findOne({ where: { name, id_category } });
    if (exists) {
      return res.status(409).json({
        statusCode: 409,
        error: "Ya existe un servicio con ese nombre en esta categoría",
      });
    }

    await LegalService.create({ name, id_category, price, duration, description, status });
    res.status(200).json({
      statusCode: 200,
      message: "Servicio creado correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al crear el servicio",
      details: error.message,
    });
  }
};

// Obtener todos los servicios legales
export const getLegalServices = async (req: Request, res: Response) => {
  try {
    // ✅ Acepta tanto 'offset' como 'page'
    const offsetParam = req.query.offset ? parseInt(req.query.offset as string) : null;
    const pageParam = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : null;

    let services;
    let total;
    let lastPage = 1;

    if (limit !== null) {
      // ✅ Calcula offset según lo que venga
      const offset = offsetParam !== null ? offsetParam : (pageParam - 1) * limit;

      total = await LegalService.count();

      services = await LegalService.findAll({
        limit,
        offset,
        order: [["id_service", "ASC"]],
        include: [{ model: ServiceCategory, as: "category" }],
      });

      // ✅ Mantiene compatibilidad con paginación
      lastPage = Math.ceil(total / limit);
    } else {
      services = await LegalService.findAll({
        order: [["id_service", "ASC"]],
        include: [{ model: ServiceCategory, as: "category" }],
      });
      total = services.length;
    }

    res.json({
      statusCode: 200,
      data: services,
      total,
      limit,
      lastPage,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener los servicios",
      details: error.message,
    });
  }
};

// Obtener servicio legal por ID
export const getLegalServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await LegalService.findByPk(id, {
      include: [{ model: ServiceCategory, as: "category" }],
    });

    if (!service) {
      return res.status(404).json({
        statusCode: 404,
        error: "Servicio no encontrado",
      });
    }

    res.json({
      statusCode: 200,
      data: service,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: "Error al obtener el servicio",
      details: error.message,
    });
  }
};

// Actualizar servicio legal
export const updateLegalService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, id_category, price, duration, description, status } = req.body;

    const service = await LegalService.findByPk(id);
    if (!service) {
      return res.status(404).json({
        statusCode: 404,
        message: "Servicio no encontrado",
      });
    }

    if (id_category) {
      const category = await ServiceCategory.findByPk(id_category);
      if (!category) {
        return res.status(404).json({
          statusCode: 404,
          message: "La categoría asociada no existe",
        });
      }
    }

    await service.update({
      name: name ?? service.name,
      id_category: id_category ?? service.id_category,
      price: price ?? service.price,
      duration: duration ?? service.duration,
      description: description ?? service.description,
      status: status ?? service.status,
    });

    res.json({
      statusCode: 200,
      message: "Servicio actualizado correctamente",
      data: service,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar el servicio",
      error: error.message,
    });
  }
};

// Eliminar servicio legal
export const deleteLegalService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await LegalService.findByPk(id);

    if (!service) {
      return res.status(404).json({
        statusCode: 404,
        message: "Servicio no encontrado",
      });
    }

    await service.destroy();
    res.json({
      statusCode: 200,
      message: "Servicio eliminado correctamente",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar el servicio",
      error: error.message,
    });
  }
};
