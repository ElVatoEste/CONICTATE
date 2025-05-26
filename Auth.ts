import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const existingUser = querySnapshot.docs[0];
          console.log("User already exists:", existingUser.data());
        } else {
          const newUserRef = doc(usersCollection);
          await setDoc(newUserRef, {
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
            lastLogin: new Date(),
          });
          console.log("✅ New user saved");
        }

        return true;
      } catch (error) {
        console.error("🔥 Error saving user:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
  // ✅ Si es nuevo login, guardamos el email en el token
  if (user?.email) {
    token.email = user.email;
  }

  // ✅ Siempre que tengamos email, buscamos el rol desde Firestore
  if (token.email) {
    const q = query(collection(db, "users"), where("email", "==", token.email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      token.id = userDoc.id;
      token.role = userDoc.data().role || "user";
    }
  }

  return token;
},

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      return session;
    }
  },
};
