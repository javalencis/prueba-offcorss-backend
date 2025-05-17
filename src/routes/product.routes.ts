import { Router } from "express";
import { getProductById, getProducts } from "../controllers/product.controller";
import { authenticateToken } from "../middleware/authMiddleware";



const router = Router()


router.get('/products',getProducts)
router.get('/products/:productId',getProductById)

export default router