import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ScreenHeader } from "../../components/screen-header";
import { router, useLocalSearchParams } from "expo-router";
import RadioGroup from 'react-native-radio-buttons-group';

export default function PostInfor(props: any) {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url_image, setUrl_image] = useState<string>();
  const [published_at, setPublishedAt] = useState<Date | null>();
  const [user, setUser] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState('1');

  async function handleValidatePost(options: {
    id: string,
    label: string,
    value: string
  }[], is_valid: boolean) {
    await api
      .post(`/v1/posts/${id}/validate`, {
        is_valid,
        points: Number(options.find(option => option.id === selectedId)!.value),
        post_id: Number(id)
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        router.push('/')
      })
      .catch(err => { Alert.alert(err) })
  }

  function renderValidateOptions() {
    const options = [
      {
        id: '1',
        label: '100',
        value: '100'
      },
      {
        id: '2',
        label: '150',
        value: '150'
      },
      {
        id: '3',
        label: '200',
        value: '200'
      },
    ]

    return (
      <View style={{
        flexDirection: 'column',
        gap: 8
      }}>
        <Text>Points</Text>
        <RadioGroup
          radioButtons={options}
          onPress={setSelectedId}
          selectedId={selectedId}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'green',
            height: 40
          }}
          onPress={() => {handleValidatePost(options, true)}}
        >
          Aprovar
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'red',
            height: 40
          }}
          onPress={() => {handleValidatePost(options, false)}}
        >
          Reprovar
        </TouchableOpacity>
      </View>
    )
  }

  async function getPost() {
    await api
      .get(`v1/posts/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTitle(response.data.post.title);
        setPublishedAt(published_at ? new Date(response.data.post.published_at) : null);
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
        {
          published_at === null &&
          renderValidateOptions()
        }
      </View>
    </ScrollView>
  );
}
