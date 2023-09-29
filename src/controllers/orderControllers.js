import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../services/order/index.js";
import { AppResponse } from "../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const order = createOrder(req, res)

        if (order)
            new AppResponse('success', 'Order created successfully', { order }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const orders = getOrders(req, res)

        if (orders)
            new AppResponse('success', 'Orders fetched successfully', { orders }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const order = getOrder(req, res)

        if (order)
            new AppResponse('success', 'Order fetched successfully', { order }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const updateOne = async (req, res) => {
    try {
        const order = updateOrder(req, res)

        if (order)
            new AppResponse('success', 'Order updated successfully', { order }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const deleteOne = async (req, res) => {
    try {
        const order = deleteOrder(req, res)

        if (order)
            new AppResponse('success', 'Order deleted successfully', { order }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}