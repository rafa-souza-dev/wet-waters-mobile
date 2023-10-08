import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/auth";
import jwtDecode from "jwt-decode";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/808f466cb4a10d5d67f3",
};

export default function Login() {
  const { setUser } = useContext(AuthContext);

  async function fetchUserAuthenticated() {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const dataJwt: { role: "ADMIN" | "USER" } = jwtDecode(token);
      setUser({ token, role: dataJwt.role });
    }
  }

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

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post("auth/register", {
      code,
    });
    const { token } = response.data;
    const dataJwt: { role: "ADMIN" | "USER" } = jwtDecode(token);

    setUser({ token, role: dataJwt.role });

    await SecureStore.setItemAsync("token", token);

    router.push("/");
  }

  useEffect(() => {
    fetchUserAuthenticated();
  }, []);

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
