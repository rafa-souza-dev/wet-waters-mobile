import { Stack, Tabs,  } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WebsocketContextProvider } from "../contexts/ws";
import { UserContextProvider } from "../contexts/user";
import { AuthContextProvider } from "../contexts/auth";
import { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";

export default function App() {

  const [isUserAuthenticated, setIsUserAuthenticate] = useState<boolean>(false);

  useEffect(() => {
    getItemAsync('token').then(token => {
        setIsUserAuthenticate(!!token);
    })
  }, []);

  return (
    <AuthContextProvider>
      <WebsocketContextProvider>
        <UserContextProvider>
          <StatusBar style="inverted" hidden />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {display: "none"}
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
              }}
              redirect={isUserAuthenticated}
            />
            <Tabs.Screen
              name="(tabs)"
              options={{
                title: "Blog",
              }}
            />
          </Tabs>
        </UserContextProvider>
      </WebsocketContextProvider>
    </AuthContextProvider>
  );
}
