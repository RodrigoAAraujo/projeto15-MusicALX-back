import { Router } from "express";
import { registerProduct, sendProducts, sendSpecificProduct } from "../controllers/products.controllers.js";
import { authValidation } from "../middlewares/authRouteValidation.js";
import productValidation from "../middlewares/productValidation.js";

const router = Router()

router.use(authValidation)

router.get("/products", sendProducts)
router.get("/products/:idProduct", sendSpecificProduct)
router.post("/products", productValidation, registerProduct)

export default router
