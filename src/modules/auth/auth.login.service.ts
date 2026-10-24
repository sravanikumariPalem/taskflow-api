import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { LoginInput } from "./auth.validation";
import { InvalidCredentialsError } from "./auth.errors";
import { createAccessToken } from "./auth.tokens";


export async function loginUser(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        throw new InvalidCredentialsError();
    }
    const passwordIsValid = await argon2.verify(
        user.passwordHash,
        input.password,
    );

    if (!passwordIsValid) {
        throw new InvalidCredentialsError();
    }

    const accessToken = await createAccessToken(user.id);

    return {
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
        },
        accessToken,
    };
}