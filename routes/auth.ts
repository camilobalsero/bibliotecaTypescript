import express from "express";
import authController from '../controllers/auth-controller';
import {validatorParams, validator} from '../middleware/auth-validate';
const router = express.Router();


router.post('/',validatorParams,validator, authController);


export default router;
