import { Router } from "express";

import * as userController from "../controllers/userControllers.js";

const userRouter = Router();



userRouter.route('/').get(userController.getAll);

userRouter.route('/:id').get(userController.getOne);

userRouter.route('/:id').put(userController.updateOne);

userRouter.route('/:id').delete(userController.deleteOne)



export default userRouter;