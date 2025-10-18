import { Response, Request } from "express";
import Service from "../models/LegalServices.model.js";

export class ServiceController {
  // Crear servicio
  static createService = async (req: Request, res: Response) => {
    const service = new Service(req.body);
    try {
      await service.save();
      res.send("Servicio creado correctamente");
    } catch (error) {
      console.error(error);
      // res.status(500).json({ message: "Error al crear el serfffvicio" });
    }
  };

  // Obtener todos los servicios
  static getServices = async (_req: Request, res: Response) => {
    try {
      const services = await Service.findAll();
      res.json({ data: services });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los servicios" });
    }
  };

  // Obtener servicio por ID
  static getServiceById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      res.json({ data: service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el servicio" });
    }
  };

  // Actualizar servicio
  static updateService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      await service.update(req.body);
      res.json({
        message: "Servicio actualizado correctamente",
        data: service,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el servicio" });
    }
  };

  // Eliminar servicio
  static deleteService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      await service.destroy();
      res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el servicio" });
    }
  };
}
