// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
export {};
// export interface AuthRequest extends Request {
//   user?: string | JwtPayload;
// }
// export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
//   if (!token) {
//     return res.status(401).json({ message: "Token requerido" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded; // Guarda los datos decodificados en la request
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Token inválido o expirado" });
//   }
// };
//# sourceMappingURL=auth.js.map