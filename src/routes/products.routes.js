import { Router } from "express";
import { registerProduct, sendProducts, sendSpecificProduct } from "../controllers/products.controllers";
import productValidation from "../middlewares/productValidation";

const router = Router()

router.use(authValidation)

router.get("/products", sendProducts)
router.get("/products/:idProduct", sendSpecificProduct)
router.post("/products", productValidation, registerProduct)

