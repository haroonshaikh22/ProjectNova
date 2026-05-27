import { Router } from "express";
import {loginUser, logoutUser, regieterUser} from "../controllers/auth.controllers.js";
import { userLoginValidator, userRegisterValidator, } from "../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';



const router = Router();

router.route("/register").post(userRegisterValidator(),validate, regieterUser);
router.route("/login").post(userLoginValidator(),validate, loginUser);
router.route("/logout").post(verifyJWT,logoutUser);





export default router;