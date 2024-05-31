import {Request,Response,NextFunction} from "express";
import { check, validationResult } from "express-validator";

export let validatorParams = [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 15}),
  check('name').isLength({ min: 1, max: 255}),
  check('lastName').isLength({ min: 1, max: 255}),
  check('phoneNumber').isLength({ min: 10, max: 10}).isString(),
  check('age').isNumeric(),
  check('document').isLength({min:4, max:12  }).isString()

];


export function validator(req: Request, res: Response, next:NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

