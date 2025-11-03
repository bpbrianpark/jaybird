import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import "dotenv/config";

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
                    return null;
                }

                const adminUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
                
                let rawHash = process.env.ADMIN_PASSWORD_HASH_B64 || process.env.ADMIN_PASSWORD_HASH;
                
                if (!rawHash) {
                    return null;
                }

                rawHash = rawHash.trim();
                if (rawHash.startsWith('"') && rawHash.endsWith('"')) {
                    rawHash = rawHash.slice(1, -1);
                    rawHash = rawHash.replace(/\\\$/g, '$');
                } else if (rawHash.startsWith("'") && rawHash.endsWith("'")) {
                    rawHash = rawHash.slice(1, -1);
                }

                let adminPasswordHash;
                if (rawHash.startsWith('$2')) {
                    adminPasswordHash = rawHash;
                    console.log("🔍 Using: direct bcrypt hash");
                } else {
                    try {
                        adminPasswordHash = Buffer.from(rawHash, 'base64').toString('utf-8');
                        console.log("🔍 Detected base64 encoded hash, decoded");
                    } catch (error) {
                        return null;
                    }
                }
                
                if (!adminPasswordHash || !adminPasswordHash.startsWith('$2')) {
                    return null;
                }

                const usernameMatch = credentials.username.trim() === adminUsername;
                
                try {
                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        adminPasswordHash
                    );

                    if (!usernameMatch || !passwordMatch) {
                        return null;
                    }

                    return {
                        id: "1",
                        name: adminUsername,
                        email: null,
                    };
                } catch (error) {
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
