import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// Next.js automatically loads .env.local - no need for dotenv/config

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.log("❌ Missing credentials");
                    return null;
                }

                const adminUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
                
                // Get the hash (try base64 version first, then direct)
                let rawHash = process.env.ADMIN_PASSWORD_HASH_B64 || process.env.ADMIN_PASSWORD_HASH;
                
                if (!rawHash) {
                    console.error("❌ Neither ADMIN_PASSWORD_HASH nor ADMIN_PASSWORD_HASH_B64 is set");
                    console.error("Available ADMIN env vars:", Object.keys(process.env).filter(k => k.includes("ADMIN")));
                    return null;
                }

                // Remove quotes if present
                rawHash = rawHash.trim();
                if (rawHash.startsWith('"') && rawHash.endsWith('"')) {
                    rawHash = rawHash.slice(1, -1);
                    rawHash = rawHash.replace(/\\\$/g, '$');
                } else if (rawHash.startsWith("'") && rawHash.endsWith("'")) {
                    rawHash = rawHash.slice(1, -1);
                }

                // Detect if it's base64 encoded (starts with base64 chars, not $2)
                // bcrypt hashes always start with $2a$, $2b$, or $2y$
                let adminPasswordHash;
                if (rawHash.startsWith('$2')) {
                    // Direct bcrypt hash
                    adminPasswordHash = rawHash;
                    console.log("🔍 Using: direct bcrypt hash");
                } else {
                    // Likely base64 encoded - decode it
                    try {
                        adminPasswordHash = Buffer.from(rawHash, 'base64').toString('utf-8');
                        console.log("🔍 Detected base64 encoded hash, decoded");
                    } catch (error) {
                        console.error("❌ Failed to decode base64 hash:", error);
                        return null;
                    }
                }

                console.log("🔍 Hash length:", adminPasswordHash?.length);
                console.log("🔍 Hash starts with:", adminPasswordHash?.substring(0, 10));
                
                // Validate hash format
                if (!adminPasswordHash || !adminPasswordHash.startsWith('$2')) {
                    console.error("❌ Hash format invalid! Should start with $2b$, $2a$, or $2y$");
                    console.error("❌ Got:", adminPasswordHash?.substring(0, 20));
                    return null;
                }

                const usernameMatch = credentials.username.trim() === adminUsername;
                
                try {
                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        adminPasswordHash
                    );

                    console.log("🔍 Username match:", usernameMatch);
                    console.log("🔍 Password match:", passwordMatch);

                    if (!usernameMatch || !passwordMatch) {
                        console.log("❌ Authentication failed");
                        return null;
                    }

                    console.log("✅ Authentication successful");
                    return {
                        id: "1",
                        name: adminUsername,
                        email: null,
                    };
                } catch (error) {
                    console.error("❌ Error during bcrypt comparison:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, 
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
