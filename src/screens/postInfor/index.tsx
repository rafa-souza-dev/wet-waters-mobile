import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { api } from "../../api";
import { ScreenHeader } from "../../components/screen-header";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { getAuthenticated } from "../../getAuthenticated";

export function PostInfor(props: any) {
  const id = props.route.params.id;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url_image, setUrl_image] = useState<string>();
  const [user, setUser] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);

  async function getPost() {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get(`v1/posts/${id}`, {
          headers: {
            authorization: `Bearer ${tokenInfor.token}`,
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
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#0984E3" }}>
      <ScreenHeader
        text="Postagem"
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            props.navigation.goBack();
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
