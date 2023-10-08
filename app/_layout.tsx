import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WebsocketContextProvider } from "../contexts/ws";
import { UserContextProvider } from "../contexts/user";
import { AuthContext, AuthContextProvider } from "../contexts/auth";

export default function Layout() {

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
