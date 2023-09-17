import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { UserContextProvider } from "../../contexts/user";
import { WebsocketContextProvider } from "../../contexts/ws";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  size: number;
}) {
  return <MaterialCommunityIcons style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <WebsocketContextProvider>
      <UserContextProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Posts",
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon
                  name="format-list-bulleted"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="animals"
            options={{
              title: "Animals",
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon name="jellyfish" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <TabBarIcon name="account" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </UserContextProvider>
    </WebsocketContextProvider>
  );
}
