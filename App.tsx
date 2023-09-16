import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import React from "react";
import { StatusBar } from "react-native";
import { UserContextProvider } from "./src/contexts/user";

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar 
          barStyle={"light-content"}
        />        
        <Routes />
      </NavigationContainer>
    </UserContextProvider>
  );
}
