import * as React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import { Image } from 'expo-image';
import { UserContext } from '../../contexts/user';

interface DrawerProviderProps {
  screen: "Blog" | "Animals"
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  navigate: (screen: string) => void
}

function renderLeftMenu(
  screen: "Blog" | "Animals", 
  setIfOpenLeftMenu: (open: boolean) => void,
  navigate: (screen: string) => void
) {
  const {
    avatar_url, username, clearContext
  } = React.useContext(UserContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <View>
        <View
          style={{
            height: 80,
            marginBottom: 15,
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderBottomWidth: 2,
            borderBottomColor: "black"
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "blue"
            }}
            source={avatar_url}
          />

          <Text
            style={{
              fontWeight: "bold"
            }}
          >
            {username}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: screen === "Blog" ? "blue" : "#313131",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 10,
            height: 60,
            borderBottomWidth: 2,
            borderBottomColor: "black"
          }}
          onPress={screen === "Blog" ? () => {} : () => {
            setIfOpenLeftMenu(false)
            navigate("ListPosts")
          }}
        >
          <Entypo
             name="home" 
             size={28} 
             color="white" 
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "white"
            }}
          >
            Águas Blog
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: screen === "Animals" ? "blue" : "#313131",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 10,
            height: 60,
            borderBottomWidth: 2,
            borderBottomColor: "black"
          }}
          onPress={() => {
            setIfOpenLeftMenu(false)
            navigate("Animais")
          }}
        >
          <Feather name="alert-octagon" size={28} color="white" />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: "white"
            }}
          >
            Catálogo de Animais
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#313131",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
          height: 60,
          borderBottomWidth: 2,
          borderBottomColor: "black"
        }}
        onPress={() => {
          Alert.alert("Sair", "Deseja sair do App?", [
            {
              text: "Sim",
              onPress: async () => {
                setIfOpenLeftMenu(false)
                clearContext()
                await SecureStore.deleteItemAsync("token")
                navigate("Login")
              }
            },
            {
              text: "Não",
              onPress: () => {}
            }
          ])
        }}
      >
        <Entypo name="log-out" size={28} color="white" />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "white"
          }}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  )
}


export function DrawerProvider({
  children,
  open,
  setOpen,
  screen,
  navigate
}: DrawerProviderProps) {
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => renderLeftMenu(screen, setOpen, navigate)}
    >
      {children}
    </Drawer>
  );
}
