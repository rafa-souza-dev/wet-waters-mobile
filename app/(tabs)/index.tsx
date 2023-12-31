import { FlatList, TextInput, View, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Post, PostProps } from "../../components/post";
import { ScreenHeader } from "../../components/screen-header";
import { UserContext } from "../../contexts/user";
import { api } from "../../services/api";
import { router } from "expo-router"
import { AuthContext } from "../../contexts/auth";

export default function ListPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const { user } = useContext(AuthContext);
  const {
    id,
    setId,
    setPoint, 
    setUsername, 
    setAvatarUrl
  } = useContext(UserContext);
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
            user: { username: string; point: number; avatar_url: string, id: number };
          };
        }) => {
          setId(res.data.user.id);
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
      .then((res) => {
        console.log(res.data)
        setPosts(res.data.posts)
      })
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
        onPress={() => {router.push("/new/post")}}
      >
      <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      { user?.role === "ADMIN" &&
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "80%",
          bottom: "18%",
          backgroundColor: "red",
          zIndex: 1000,
          borderRadius: 50,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {router.push("/(admin)/posts-analysis")}}
      >
        <Ionicons name="analytics" size={32} color="black" />
      </TouchableOpacity>
      }
      <FlatList
        style={{
          backgroundColor: "#0984E3",
          paddingHorizontal: 40,
        }}
        data={posts}
        renderItem={({ index, item }) => (
          <Post 
            key={index} 
            id={item.id} 
            description={item.description} 
            isLiked={!!(item.likes.find(like => like.user_id === id))}
            likes={item.likes}
            likes_count={item.likes_count}
            title={item.title}
            url_image={item.url_image}
            user={item.user}
            infor={() => {}} 
          />
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
