import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
                const adminPassword = process.env.ADMIN_PASSWORD?.trim() || "password123";

                const usernameMatch = credentials.username.trim() === adminUsername;
                const passwordMatch = credentials.password === adminPassword;

                if (!usernameMatch || !passwordMatch) {
                    return null;
                }

                return {
                    id: "1",
                    name: adminUsername,
                    email: null,
                };
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
