import argon2 from "argon2";
import{ eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { RegisterInput } from "./auth.validation";

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
    this.name = "EmailAlreadyExistsError";
  }
}

export async function registerUser(input: RegisterInput) {
    const email = input.email.trim().toLowerCase();

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
        columns:{id:true}
    })
    if(existingUser){
        throw new EmailAlreadyExistsError();
    }
    const passwordHash = await argon2.hash(input.password);
    try{
        const [user] = await db.insert(users).values({
            email,
            passwordHash,
            displayName: input.displayName?.trim()|| null
        }). returning({
            id:users.id,
            email:users.email,
            displayName:users.displayName
        })
        return user;
    } catch (error) {
        if(typeof error === "object" && error !== null && "code" in error && (error as any).code === "23505"){
            throw new EmailAlreadyExistsError();
        }
        throw error;
    }
}