import NextAuth from "next-auth";
import CredentilsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const authOptions = {
    providers: [
        CredentilsProvider({
            name: 'credentials',

            credentials: {},
            async authorize(credentials, req){

            }

        })
    ],
    session: {
        strategy: "jwt",
    },
    secret:  process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };