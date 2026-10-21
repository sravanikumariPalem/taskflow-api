import {Router} from "express";
import {registerSchema} from "./auth.validation";

export const authRouter=Router();

authRouter.post("/register",(req,res)=>{
    const result=registerSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success:false,
            errors:{
                message:"Validation failed",
                details:result.error.issues.map((err)=>({
                    path: err.path.join("."),
                    message: err.message
                }))
            }
        });
    }
    return res.status(501).json({
        success:false,
        message:"Registeration not implemented"
    });
});