import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WebsocketContextProvider } from "../contexts/ws";
import { UserContextProvider } from "../contexts/user";
import { AuthContextProvider } from "../contexts/auth";

export default function App() {
  return (
    <AuthContextProvider>
      <WebsocketContextProvider>
        <UserContextProvider>
          <StatusBar style="inverted" hidden />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
              }}
            />
            <Tabs.Screen
              name="(tabs)"
              options={{
                title: "Blog",
              }}
            />
          </Stack>
        </UserContextProvider>
      </WebsocketContextProvider>
    </AuthContextProvider>
  );
}
