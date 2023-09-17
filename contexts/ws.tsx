import { createContext, ReactNode } from "react";
import React from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

interface WebsocketContextProviderProps {
  children: ReactNode;
}

interface WebsocketContextData {
  sendMessage: SendMessage
  lastMessage: MessageEvent<any> | null
}

export const WebsocketContext = createContext({} as WebsocketContextData);

export function WebsocketContextProvider({ children }: WebsocketContextProviderProps) {
    const { sendMessage, lastMessage } = useWebSocket(process.env.EXPO_PUBLIC_WS_URL!)

    return (
      <WebsocketContext.Provider
        value={{
            sendMessage, 
            lastMessage
        }}
        >
        {children}
      </WebsocketContext.Provider>
    );
}
