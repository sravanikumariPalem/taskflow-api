import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { LoginInput } from "./auth.validation";
import {InvalidCredentialsError} from "./auth.errors";

export async function loginUser(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const user = await db.select().from(users).where(eq(users.email, email));

    if(!user){
        throw new InvalidCredentialsError();
    }
    const passwordIsValid = await argon2.verify(user[0].passwordHash, input.password);
    if (!passwordIsValid) {
        throw new InvalidCredentialsError();
    }
    return {
        id: user[0].id,
        email: user[0].email,
        displayName: user[0].displayName
    }
}