import {SignJWT} from 'jose';
import {env} from '../../config/env';

const secret = Buffer.from(env.JWT_ACCESS_SECRET, "hex")

export async function createAccessToken(userId: string):Promise<string>{

    return new SignJWT()
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuer("taskflow-api")
    .setAudience("taskflow-client")
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);

} 
