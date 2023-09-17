import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Image, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ScreenHeader } from "../../components/screen-header";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function PostInfor() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url_image, setUrl_image] = useState<string>();
  const [user, setUser] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);

  async function getPost() {
    await api
      .get(`v1/posts/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTitle(response.data.post.title);
        setDescription(response.data.post.description);
        setUrl_image(response.data.post.url_image);
        setUser(response.data.post.user);
        setLikes(response.data.post.likes);
      });
  }

  async function getToken() {
    const tokenInfor = await SecureStore.getItemAsync("token");
    setToken(tokenInfor);
  }

  useEffect(() => {
    getToken();
    if (!!token) {
      getPost();
    }
  }, [token]);

  return (
    <ScrollView style={{ backgroundColor: "#0984E3" }}>
      <ScreenHeader
        text="Postagem"
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            router.back();
          },
        }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginVertical: 20,
          marginLeft: "5%",
          borderRadius: 16,
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Text>
        <Image
          source={{ uri: url_image }}
          style={{
            backgroundColor: "#fff",
            width: 300,
            height: 300,
            alignSelf: "center",
          }}
        />
        <Text style={{ fontSize: 14, textAlign: "right", fontWeight: "bold" }}>
          {user}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "justify" }}>
          {description}
        </Text>
      </View>
    </ScrollView>
  );
}
