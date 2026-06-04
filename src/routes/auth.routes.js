import { Router } from "express";
import {changePassword, forgotPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetPassword, verifyEmail} from "../controllers/auth.controllers.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator, } from "../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';



const router = Router();

// unsecured routes
router.route("/register").post(userRegisterValidator(),validate, registerUser);
router.route("/login").post(userLoginValidator(),validate, loginUser);
router.route("/verify-email/:verificationToken").post(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPassword);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetPassword);





// secured routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/current-user").post(verifyJWT,getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator(),validate, changePassword);
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification);






export default router;