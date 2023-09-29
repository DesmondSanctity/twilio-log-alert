import { Orders, Users } from "../../models/index.js";
import { getPagination } from "../../utils/paginateQuery.js";
import { AppError } from "../../utils/responseHandler.js";
import { validateDiscount } from "../../utils/validateDiscount.js";

export const createOrder = async (req, res) => {
    const { itemName, itemDescription, amount } = req.body
    try {

        if (discount.isDiscount) {
            const order = await Orders.create({
                itemName: itemName,
                itemDescription: itemDescription,
                amount: amount,
                status: "Pending",
                userId: req.user.userId ? req.user.userId : null
            });

            if (order) {
                return order;
                // new AppResponse('success', '...', { order }, 200).send(res);
            } else {
                throw new AppError('failed', '...', 400);
            }
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const getOrders = async (req, res) => {
    try {
        const results = getPagination(Orders, {
            ...req.query,
            where: {},
            include: [
                {
                    model: Users,
                    required: false,
                    attributes: {
                        exclude: ['password']
                    }
                },
            ],
            order: []
        })

        if (results) {
            return results;
            // new AppResponse('success', '...', { results }, 200).send(res);
        } else {
            throw new AppError('failed', '...', 400);
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const getOrder = async (req, res, next) => {
    try {

        if (req.params.id) {
            const order = await Orders.findOne({
                where: { orderId: req.params.id },
                include: [
                    {
                        model: Users,
                        required: false,
                        attributes: {
                            exclude: ['password']
                        }
                    }
                ]
            })

            if (order) {
                return order;
                // new AppResponse('success', '...', { order }, 200).send(res);
            } else {
                throw new AppError('failed', '...', 400);
            }

        } else {
            throw new AppError('failed', '...', 400);
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const updateOrder = async (req, res) => {
    try {

        if (req.body.orderId) {
            const order = await Orders.update(req.body, {
                where: {
                    orderId: req.body.orderId
                }
            });

            if (order) {
                return order;
                // new AppResponse('success', '...', { order }, 200).send(res);
            } else {
                throw new AppError('failed', '...', 400);
            }

        } else {
            throw new AppError('failed', '...', 400);
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const deleteOrder = async (req, res) => {
    try {

        if (req.params.id) {
            const order = await Orders.destroy({
                where: {
                    orderId: req.params.id
                }
            });

            if (order) {
                return order;
                // new AppResponse('success', '...', { order }, 201).send(res);
            } else {
                throw new AppError('failed', '...', 400);
            }

        } else {
            throw new AppError('failed', '...', 400);
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}