import { Router } from "express";

import * as authController from "../controllers/authControllers.js";
import Auth from "../middlewares/auth.js";

const authRouter = Router();


/** POST Methods */

/**
 * @openapi
 * '/api/v1/auth/signup':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Sign up a User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - fullName
 *              - phoneNumber
 *              - dateOfBirth
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe100@user!!
 *              fullName:
 *                type: string
 *                default: John Doe
 *              phoneNumber:
 *                type: string
 *                default: 1255443277
 *              dateOfBirth:
 *                type: string
 *                default: 22-07-1997
 *     responses:
 *      201:
 *        description: Created Successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.route('/signup').post(authController.signup)

/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe100@user!!
 *     responses:
 *      201:
 *        description: Created Successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.route('/login').post(authController.login);

/**
 * @openapi
 * '/api/v1/auth/forgotPassword':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Send a user OTP for forgotten Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *     responses:
 *      201:
 *        description: Created Successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.route('/forgotPassword').post(authController.forgotPassword);

/**
 * @openapi
 * '/api/v1/auth/resetPassword':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: User reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - newPassword
 *            properties:
 *              newPassword:
 *                type: string
 *                default: johnDoe100@user2!!
 *     responses:
 *      201:
 *        description: Created Successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.route('/resetPassword').post(Auth, authController.resetPassword);

/**
 * @openapi
 * '/api/v1/auth/changePassword':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: User reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: johnDoe100@user!!
 *              newPassword:
 *                type: string
 *                default: johnDoe100@user2!!
 *     responses:
 *      201:
 *        description: Created Successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.route('/changePassword').post(Auth, authController.changePassword);



export default authRouter;