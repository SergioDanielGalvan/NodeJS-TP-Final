// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  createProducto,
} from "../controladores/ProductosController.js";

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.get("/productos/:nombre", getProductoByNombre);
router.post("/productos", createProducto);
router.delete("/productos/:id", createProducto);

export default router;