import { login } from "@/backend/users";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "username", type: "text" },
        password: {label: "password", type: "text" }
      },
      async authorize(credentials: any, req) {
        const user = await login(credentials.email, credentials.password);

        // if(!user){
        //   throw new Error("Invalid Credentials");
        // }
        
        return {
          id: "1" || "",
          email: credentials.email,
          password: credentials.password,
          environment: "test.environment"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.environment = user.environment;
      }
      return token;
    },
    async session({ session, user, token }) {
      if(session.user && token){
        session.user.id = String(token.id);
        session.user.environment = String(token.environment)
      }
      return session;
    },
  },
};