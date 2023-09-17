import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<boolean>(false);

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
        setIsUserAuthenticate(!!token);
    })
  }, []);
  
  return (
    <>
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
          redirect={isUserAuthenticated}
        />
        <Tabs.Screen
          name="(tabs)"
          options={{
            title: "Blog",
          }}
        />
      </Stack>
    </>
  );
}