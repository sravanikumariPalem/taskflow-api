import type {Response, Request, NextFunction} from "express";
import {registerSchema, loginSchema} from "./auth.validation";
import {
    EmailAlreadyExistsError, registerUser
} from "./auth.service";
import {loginUser} from "./auth.login.service";
import {InvalidCredentialsError} from "./auth.errors";

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


export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  try {
    const user = await loginUser(validation.data);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    next(error);
  }
}
