import { Router } from "express";

import * as orderController from "../controllers/orderControllers.js";

const orderRouter = Router();



orderRouter.route('/').post(orderController.create)

orderRouter.route('/').get(orderController.getAll);

orderRouter.route('/:id').get(orderController.getOne);

orderRouter.route('/:id').put(orderController.updateOne);

orderRouter.route('/:id').delete(orderController.deleteOne)



export default orderRouter;