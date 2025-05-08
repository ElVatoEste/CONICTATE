import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, ...rest }) {
      if (account && account.callbackUrl) {
        const url = new URL(account.callbackUrl as string)
        const role = url.searchParams.get('role')
        token.role = role || 'employee'
        console.log('[JWT] role set from callbackUrl:', token.role)
      }
      console.log('JWT', token, account, user, rest)
      return token
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role
      }
      return session
    }
  }
} satisfies NextAuthOptions
