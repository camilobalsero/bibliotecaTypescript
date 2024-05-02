import express from "express";
import validateToken from "../middleware/validate-token";
import getLibrosController from "../controllers/getLibros-controller";
const router = express.Router();


router.get('/', validateToken, getLibrosController);


export default router;