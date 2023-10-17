import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { WebsocketContext } from "../../contexts/ws";

export interface PostProps {
  id: number;
  title: string;
  description: string;
  url_image: string;
  user: string;
  likes_count: number;
  likes: {
    user_id: number;
    post_id: number;
  }[]
  isLiked: boolean
  infor: (id: number) => void;
  published_at: string | null
}

export function Post({ id, description, title, url_image, user, likes_count, isLiked }: PostProps) {
  const { sendMessage } = useContext(WebsocketContext)
  const [fakeLikes, setFakeLikes] = useState(likes_count);
  const [isFakeLiked, setIsFakeLiked] = useState(isLiked);
  const [token, setToken] = useState<string | null>(null);

  async function getToken() {
    const tokenInfor = await SecureStore.getItemAsync("token");
    setToken(tokenInfor);
  }

  async function likePost() {
    await api
      .post(`v1/posts/${id}/likes`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { isLiked }: { isLiked: boolean } = res.data

        sendMessage(JSON.stringify({
          type: "update-points",
          username: user,
          points: isLiked ? -5 : 5
        }))
      })
      .catch((err) => {
        console.log("falha")
        console.log(err.response)
      });
  }

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <TouchableOpacity onPress={() => router.push(`/posts/${id}`)}>
      <View style={{backgroundColor: "#fff", padding: 6, marginVertical: 10, borderRadius: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
        <Image source={{ uri: url_image }} style={{ backgroundColor: "#fff", width: 256, height: 256, alignSelf: "center"}} />
        <Text style={{ fontSize: 12, textAlign: "right", fontWeight: "bold" }}>{user}</Text>
        <Text style={{ fontSize: 14, textAlign: "justify" }}>{description}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            gap: 4
          }}
        >
          {
            isFakeLiked ?
              <AntDesign
                name="heart" 
                size={24} 
                color="red"
                onPress={() => {
                  likePost()
                  setIsFakeLiked(false)
                  setFakeLikes(state => state - 1)
                }}
              />
            :
              <AntDesign
                name="hearto" 
                size={24} 
                color="black" 
                onPress={() => {
                  likePost()
                  setIsFakeLiked(true)
                  setFakeLikes(state => state + 1)
                }}
              />
          }
          <Text> {fakeLikes} likes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
