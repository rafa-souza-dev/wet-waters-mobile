import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ScreenHeader } from "../../components/screen-header";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../../services/api";
import React from "react";
import { router, useGlobalSearchParams } from "expo-router";

export default function CreatePost() {
  const [url_image, set_url_image] = useState<ImagePicker.ImagePickerAsset>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState<string | null>(null);

  async function openImagePicker() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 1,
      });

      if (result.assets == null) {
      } else {
        set_url_image(result.assets[0]);
      }
    } catch (err) {
      console.error(`openImagePicker(): ${err}`);
    }
  }

  async function createPost() {
    await api
      .post(
        "v1/posts",
        {
          title,
          description,
          image: url_image?.base64!,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        router.back();
      })
      .catch((err: { response: { data: string } }) =>
        console.log("erro" + err.response.data)
      );
  }

  async function getToken() {
    const tokenInfor = await SecureStore.getItemAsync("token");
    setToken(tokenInfor);
  }

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <ScrollView>
      <ScreenHeader
        text={"Criar Post"}
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            router.push("/(tabs)");
          },
        }}
      />
      <View
        style={{
          flex: 1,
          paddingTop: 32,
          alignItems: "center",
          gap: 12,
          backgroundColor: "#0984E3",
          paddingBottom: 120,
        }}
      >
        <TouchableOpacity onPress={openImagePicker}>
          <Image
            style={{
              width: 256,
              height: 256,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            source={{ uri: url_image?.uri }}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            width: "90%",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 16,
            padding: 12,
          }}
          value={title}
          onChangeText={setTitle}
          placeholder="Titulo"
        />
        <TextInput
          style={{
            width: "90%",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 16,
            padding: 12,
            height: 200,
            textAlignVertical: "top",
          }}
          value={description}
          onChangeText={setDescription}
          placeholder="descrição"
          multiline
        />
        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#0BE6A8",
            padding: 12,
            borderRadius: 16,
            alignItems: "center",
          }}
          onPress={createPost}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
