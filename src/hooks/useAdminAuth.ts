import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// project-459967197218

export function useAdminAuth() {
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email === "nacossuil@gmail.com") {
        setUser({
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, login, logout };
}
