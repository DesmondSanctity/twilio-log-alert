import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../../models/index.js";
import { jwtSecret, jwtExpiresIn, baseUrl } from "../../config/index.js";
import { AppError } from "../../utils/responseHandler.js";


export const signupUser = async (req, res) => {
    try {

        const { email, fullName, phoneNumber, password, dateOfBirth } = req.body

        // Use async/await instead of promises
        const existEmail = await Users.findOne({ where: { email: email } });

        if (existEmail) {
            throw new AppError('failed', 'Email already exsit. Try again', 400);
        }

        const existPhoneNumber = await Users.findOne({ where: { phoneNumber: phoneNumber } });

        if (existPhoneNumber)
            throw new AppError('failed', 'Phone number already exsit. Try again', 400);

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await Users.create({
            email: email,
            password: hashedPassword,
            fullName: fullName,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth
        });

        const newUser = await Users.scope('withoutSensitiveInfo').findByPk(user.userId);

        // Create a JWT//using email, we would use role for the purpose of authorization
        const token = jwt.sign({
            userId: user.userId
        }, jwtSecret, { expiresIn: jwtExpiresIn });

        // Create success response
        return { user: newUser, token };
        // new AppResponse("success", 'User created successfully', { user: newUser, token }, 201).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        // Find the user by email
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) {
            throw new AppError('failed', 'User with this email not found', 400);
        }
        // Checking for valid  password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw new AppError('failed', 'Invalid email or password', 400);
        }

        // Create a JWT//using email, we would use role for the purpose of authorization
        const token = jwt.sign({
            userId: user.userId
        }, jwtSecret, { expiresIn: jwtExpiresIn });

        user.password = null

        return { user, token };
        // new AppResponse('success', 'User logged in successfully', { user, token }, 201).send(res);

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const forgetPasswordUser = async (req, res) => {
    const { email } = req.body
    try {
        if (email) {
            // Find the user by email
            const user = await Users.findOne({ where: { email: email } });

            if (!user) {
                throw new AppError('failed', 'Email does not exit', 400);
            }
            const token = jwt.sign({
                userId: user.userId
            }, jwtSecret, { expiresIn: jwtExpiresIn });
            
            const resetPasswordLink = `${baseUrl}/resetPassword/${token}`;

            return resetPasswordLink
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const resetPasswordUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const body = { password: hashedPassword }

    let user;

    try {
        if (req.user) {
            user = await Users.findOne({
                where: {
                    userId: req.user.userId
                }
            });
        } else {
            throw new AppError('failed', 'Unauthorized. Try again', 400);
        }

        if (user) {
            await Users.update(body, {
                where: {
                    userId: user.userId
                }
            })
                .then(async () => {
                    // Now fetch the updated user with the new data
                    const updatedUser = await Users.findByPk(user.userId);

                    return updatedUser;
                    // new AppResponse('success', 'Password reset successfully', { updatedUser }, 200).send(res);
                })

        } else {
            throw new AppError('failed', 'Something went wrong. Password reset was unsuccessfull. Try again', 400);
        }


    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}

export const changePasswordUser = async (req, res) => {
    const oldHashedPassword = await bcrypt.hash(req.body.oldPassword, 10);
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    try {
        // Find the user by email
        const user = await Users.findOne({ where: { userId: req.user.userId } });

        const body = { password: newHashedPassword }

        if (user.password !== oldHashedPassword) {
            new AppError("failed", "Password does not match", 400);
        }

        if (newHashedPassword) {
            await Users.update(body, {
                where: {
                    userId: user.userId
                }
            }).then(async () => {
                // Now fetch the updated user with the new data
                const updatedUser = await Users.scope('withoutSensitiveInfo').findByPk(user.userId);

                return updatedUser;
                // new AppResponse('success', 'Password updated successfully', { updatedUser }, 200).send(res);
            })
        } else {
            throw new AppError('failed', 'Something went wrong. Password update was unsuccessfull. Try again', 400);
        }

    } catch (error) {
        res.status(400).json({
            status: error.status,
            message: error.message,
        });
    }
}