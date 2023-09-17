import { createContext, ReactNode, useState } from "react";
import React from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextData {
  username: string
  avatar_url: string
  point: number
  setPoint: (point: number) => void
  setUsername: (username: string) => void
  setAvatarUrl: (avatar_url: string) => void
  clearContext: () => void
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState<string>("")
  const [avatar_url, setAvatarUrl] = useState<string>("")
  const [point, setPoint] = useState<number>(0)

  function clearContext() {
    setUsername("")
    setAvatarUrl("")
    setPoint(0)
  }

  return (
    <UserContext.Provider
      value={{
        point,
        setPoint,
        username,
        setUsername,
        avatar_url,
        setAvatarUrl,
        clearContext
      }}
    >
      {children}
    </UserContext.Provider>
  );
}