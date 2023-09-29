import { changePasswordUser, forgetPasswordUser, loginUser, resetPasswordUser, signupUser } from "../services/auth/index.js"
import { AppResponse } from "../utils/responseHandler.js";

export const signup = async (req, res) => {
    try {
        const userSignup = signupUser(req, res)

        if (userSignup)
            new AppResponse('success', 'User signup successfully', { userSignup }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const login = async (req, res) => {
    try {
        const userLogin = loginUser(req, res)

        if (userLogin)
            new AppResponse('success', 'User login successfully', { userLogin }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const forgot = forgetPasswordUser(req, res)

        if (forgot)
            new AppResponse('success', 'Password reset link sent', { forgot }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const reset = resetPasswordUser(req, res)

        if (reset)
            new AppResponse('success', 'Password reseted successfully', { reset }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const change = changePasswordUser(req, res)

        if (change)
            new AppResponse('success', 'Password reset link sent', { change }, 200).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}