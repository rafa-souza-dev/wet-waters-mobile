import { createContext, ReactNode, useState } from "react";
import React from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  token: string | null
  setToken: (token: string | null) => void
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(null)

    return (
      <AuthContext.Provider
        value={{
            token,
            setToken
        }}
        >
        {children}
      </AuthContext.Provider>
    );
}
