import { Request, Response } from "express";
import Task from "../models/AppointmentTasks.model.js";
import Appointment from "../models/Appointment.model.js";

export class TaskController {
  // Create a new task associated wiht an appointment
  static createTask = async (req: Request, res: Response) => {
    try {
      const { appointmentId } = req.params; // viene de la URL
      const { name, description, status } = req.body;
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
      const task = await Task.create({
        name,
        description,
        status,
        appointmentId: Number(appointmentId),
      });
      res.status(201).json({
        message: "Tarea creada exitosamente",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la tarea" });
    }
  };

  // Obtener todas las tareas (opcionalmente de una cita específica)
  static getTasks = async (req: Request, res: Response) => {
    try {
      const { appointmentId } = req.query;
      const whereClause = appointmentId
        ? { appointmentId: Number(appointmentId) }
        : {};
      const tasks = await Task.findAll({
        where: whereClause,
        include: [Appointment],
      });

      res.json({ data: tasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las tareas" });
    }
  };

  // Obtener una tarea por su ID
  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id, { include: [Appointment] });
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.json({ data: task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la tarea" });
    }
  };

  // Actualizar una tarea
  static updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      await task.update(req.body);

      res.json({
        message: "Tarea actualizada correctamente",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  };

  // Eliminar una tarea
  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      await task.destroy();

      res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  };
  // Actualizar solo el estado de una tarea
  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // ID de la tarea
      const { status } = req.body; // Nuevo estado

      // Validar que se envíe el estado
      if (!status) {
        return res
          .status(400)
          .json({ message: "El campo 'status' es obligatorio" });
      }

      // Verificar si el estado enviado es válido
      const validStatuses = [
        "pendiente",
        "en_proceso",
        "completada",
        "cancelada",
        "retrasada",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: `Estado no válido. Debe ser uno de: ${validStatuses.join(
            ", "
          )}`,
        });
      }

      // Buscar la tarea por ID
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      // Actualizar el estado
      task.status = status;
      await task.save();

      res.json({
        message: "Estado de la tarea actualizado correctamente",
        data: task,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al actualizar el estado de la tarea" });
    }
  };
}
