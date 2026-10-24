import {eq} from "drizzle-orm"
import {db} from "../../db/index"
import {refreshSessions} from "../../db/schema"
import {createRefreshToken,
        hashRefreshToken,
} from "./auth.tokens"

const REFRESH_TOKEN_TTL_MS = 7*24*60*60*1000;

export async function createRefreshSession(userId: string) {
  const refreshToken = createRefreshToken();
  const tokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

  const [session] = await db
    .insert(refreshSessions)
    .values({
      userId,
      tokenHash,
      expiresAt,
    })
    .returning({
      id: refreshSessions.id,
      expiresAt: refreshSessions.expiresAt,
    });

  return {
    refreshToken,
    sessionId: session.id,
    expiresAt: session.expiresAt,
  };
}
export async function findActiveRefreshSession(refreshToken: string) {
  const tokenHash = hashRefreshToken(refreshToken);

  const session = await db.query.refreshSessions.findFirst({
    where: eq(refreshSessions.tokenHash, tokenHash),
  });

  if (!session) {
    return null;
  }

  if (session.revokedAt !== null || session.expiresAt <= new Date()) {
    return null;
  }

  return session;
}