import { FlatList, TextInput, View, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Post, PostProps } from "../../components/post";
import { ScreenHeader } from "../../components/screen-header";
import { UserContext } from "../../contexts/user";
import { api } from "../../services/api";
import { router } from "expo-router";

export default function ListPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const { setPoint, setUsername, setAvatarUrl } = useContext(UserContext);
  const [token, setToken] = useState<string | null>(null);

  async function getProfile() {
    await api
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (res: {
          data: {
            user: { username: string; point: number; avatar_url: string };
          };
        }) => {
          setUsername(res.data.user.username);
          setPoint(res.data.user.point ?? 0);
          setAvatarUrl(res.data.user.avatar_url);
        }
      )
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function findAllposts() {
    await api
      .get("v1/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => {
        console.log(err);
      });
  }

  async function findBytitle(search: string) {
    await api
      .get(`v1/posts/search?title=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => {
        console.log(err);
      });
  }

  async function getToken() {
    const tokenInfor = await SecureStore.getItemAsync("token");
    setToken(tokenInfor);
  }

  useEffect(() => {
    getToken();
    if (!!token) {
      getProfile();
      if (search === "") {
        findAllposts();
      } else {
        findBytitle(search);
      }
    }
  }, [search, token]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScreenHeader text="Águas Blog" />
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "80%",
          bottom: "10%",
          backgroundColor: "red",
          zIndex: 1000,
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {}}
      >
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      <FlatList
        style={{
          backgroundColor: "#0984E3",
          paddingHorizontal: 40,
        }}
        data={posts}
        renderItem={({ index, item }) => (
          <Post key={index} {...item} infor={() => {}} />
        )}
      />
      <TextInput
        style={{
          width: "90%",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: 16,
          padding: 12,
        }}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar"
      />
    </View>
  );
}
