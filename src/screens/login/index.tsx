import { AuthRequestPromptOptions, AuthSessionResult, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Text, View } from "react-native";
import { Button } from "../../components/button";
import { api } from "../../api";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { styles } from "./styles";
import { AntDesign } from '@expo/vector-icons';
import React from "react";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/808f466cb4a10d5d67f3",
};

export function Login(props: any) {
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
    console.log(code);
    const response = await api.post("auth/register", {
      code,
    });
    props.navigation.navigate("ListPosts");
    const { token } = response.data;
    await SecureStore.setItemAsync("token", token);
    console.log(await SecureStore.getItemAsync("token"));
    props.navigation.navigate("ListPosts");
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button onPress={() => signInWithGithub()} style={styles.button} >
        <AntDesign name="github" size={24} color="black" />
        <Text style={styles.textButton}>Casdastrar-se pelo github</Text>
        </Button>
    </View>
  );
}
