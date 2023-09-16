import { FlatList, TextInput, View, TouchableOpacity } from "react-native";
import { Post, PostProps } from "../../components/post";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api";
import { ScreenHeader } from "../../components/screen-header";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { DrawerProvider } from "../../components/drawer-menu";
import { AntDesign } from "@expo/vector-icons";
import { getAuthenticated } from "../../getAuthenticated";
import { UserContext } from "../../contexts/user";

export function ListPosts(props: any) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isOpenLeftMenu, setIsOpenLeftMenu] = React.useState(false);

  const { setPoint, setUsername, setAvatarUrl } = useContext(UserContext);

  function navigateToCreatePost() {
    props.navigation.navigate("CreatePost");
  }

  async function getProfile() {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
          },
        })
        .then((res) => {
          setUsername(res.data.user.username);
          setPoint(res.data.user.point ?? 0);
          setAvatarUrl(res.data.user.avatar_url)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      getProfile();
      if (search === "") {
        findAllposts();
      } else {
        findBytitle(search);
      }
    });
  }, [search, props.navigation]);

  function openLeftMenu() {
    setIsOpenLeftMenu(true);
  }

  function saia(id: number) {
    props.navigation.navigate("PostInfor", { id });
  }

  async function findAllposts() {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get("v1/posts", {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
          },
        })
        .then((res) => setPosts(res.data.posts))
        .catch((err) => console.log(err));
    } else {
      props.navigation.navigate("Login");
    }
  }

  async function findBytitle(search: string) {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get(`v1/posts/search?title=${search}`, {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
          },
        })
        .then((res) => setPosts(res.data.posts));
    } else {
      props.navigation.navigate("Login");
    }
  }

  return (
    <DrawerProvider
      open={isOpenLeftMenu}
      setOpen={setIsOpenLeftMenu}
      navigate={props.navigation.navigate}
      screen="Blog"
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ScreenHeader
          text="Águas Blog"
          leftIcon={{
            icon: (
              <Entypo
                name="menu"
                size={36}
                color="black"
                style={{ width: 30 }}
              />
            ),
            action: () => {
              openLeftMenu();
            },
          }}
        />
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
          onPress={navigateToCreatePost}
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
            <Post key={index} {...item} infor={saia} />
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
    </DrawerProvider>
  );
}
