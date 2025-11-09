import { Response, Request } from "express";
import Appointment from "../models/Appointment.model.js";

export class AppointmentController {
  static createAppointment = async (req: Request, res: Response) => {
    const appointment = new Appointment(req.body);
    try {
      await appointment.save();
      res.send("Cita creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAppointments = async (req: Request, res: Response) => {
    try {
      const appointments = await Appointment.findAll();
      res.json({ data: appointments });
    } catch (error) {
      console.log(error);
    }
  };

  static getAppointmentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
      res.json({ data: appointment });
    } catch (error) {
      console.log(error);
    }
  };

  static updateAppointment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
      await appointment.update(req.body);
      return res.json({
        message: "Cita actualizada correctamente",
        data: appointment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar la cita" });
    }
  };

  static deleteAppointment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }

      await appointment.destroy();

      return res.json({ message: "Cita eliminada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar la cita" });
    }
  };
}
