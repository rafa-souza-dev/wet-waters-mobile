import { createContext, ReactNode, useState } from "react";
import React from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextData {
  id: number | null
  username: string
  avatar_url: string
  point: number
  setId: (id: number) => void
  setPoint: (point: number) => void
  setUsername: (username: string) => void
  setAvatarUrl: (avatar_url: string) => void
  clearContext: () => void
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [id, setId] = useState<number | null>(null)
  const [username, setUsername] = useState<string>("")
  const [avatar_url, setAvatarUrl] = useState<string>("")
  const [point, setPoint] = useState<number>(0)

  function clearContext() {
    setId(null)
    setUsername("")
    setAvatarUrl("")
    setPoint(0)
  }

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
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