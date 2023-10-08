import { FlatList, View } from "react-native";
import { ScreenHeader } from "../../components/screen-header";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { getItemAsync } from "expo-secure-store";
import PostAnalysis from "../../components/post-analysis";

export default function PostsAnalysis() {
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<
    { id: number, title: string, description: string, url_image: string }[]
  >([]);

  async function findAllpostsAnalysis() {
    await api
      .get("v1/posts/analysis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getToken() {
    const tokenInfor = await getItemAsync("token");
    setToken(tokenInfor);
  }

  useEffect(() => {
    getToken();
    if (!!token) {
      findAllpostsAnalysis();
    }
  }, [token]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScreenHeader text="Posts em análise" />
      <FlatList
        style={{
          backgroundColor: "#0984E3",
          paddingHorizontal: 40,
        }}
        data={posts}
        renderItem={({ index, item }) => (
          <PostAnalysis
            key={index}
            title={item.title}
            description={item.description}
            url_image={item.url_image}
          />
        )}
      />
    </View>
  );
}
