import {
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";
import { AuthContext } from "../contexts/auth";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/808f466cb4a10d5d67f3",
};

export default function Login() {
  const [_, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "808f466cb4a10d5d67f3",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "aguablogs",
      }),
    },
    discovery
  );

  const { token, setToken } = useContext(AuthContext)

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post("auth/register", {
      code,
    });
    const { token } = response.data;

    setToken(token)

    await SecureStore.setItemAsync("token", token);

    router.push("/(tabs)");
  }

  useEffect(() => {
    if (token) router.push("/(tabs)")
  }, [])

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0984E3",
      }}
    >
        <TouchableOpacity
          onPress={() => signInWithGithub()}
          style={{
            flexDirection: "row",
            gap: 8,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 16,
          }}
        >
          <AntDesign name="github" size={24} color="black" />
          <Text style={{ fontWeight: "bold" }}>Casdastrar-se pelo github</Text>
        </TouchableOpacity>
    </View>
  );
}
