import { Router } from "express";
import {regieterUser} from "../controllers/auth.controllers.js";


const router = Router();

router.route("/register").post(regieterUser);


export default router;