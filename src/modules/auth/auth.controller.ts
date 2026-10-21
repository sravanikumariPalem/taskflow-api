import type {Response, Request, NextFunction} from "express";
import {registerSchema} from "./auth.validation";
import {
    EmailAlreadyExistsError, registerUser
} from "./auth.service";
export async function registerController(req: Request, res: Response, next: NextFunction) {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: {
                message: "Validation failed",
                details: result.error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            }
        });
    }

    try {
        const user = await registerUser(result.data);
        return res.status(201).json({
            success: true,
            data: {user}
        });
    } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
            return res.status(409).json({
                success: false,
                errors: {
                    message:error.message
                }
            });
        }
        return next(error);
    }
}