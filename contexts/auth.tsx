import { useRouter, useSegments } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";
import React from "react";

type User = {
  token: string
  role: "ADMIN" | "USER"
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
} as AuthContextData);

function useProtectedRoute(user: User | null) {
  const segments =useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inAdminGroup = segments[0] === "(admin)";

    if (!user && !inAuthGroup) {
      router.replace("/sign-in")
    } else if (user && inAuthGroup) {
      router.replace("/")
    } else if (user && user.role !== "ADMIN" && inAdminGroup){
      router.replace("/")
    }
    console.log("oi")
  }, [user, segments])
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
