import { FlatList, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScreenHeader } from "../../components/screen-header";
import { Animal, AnimalProps } from "../../components/animal";
import { api } from "../../services/api";
import { router } from "expo-router";

export default function Animals() {
  const [animals, setAnimals] = useState<AnimalProps[]>([]);
  const [token, setToken] = useState<string | null>(null);

  async function findAllAnimals() {
    await api
      .get("v1/animals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: { data: { animals: AnimalProps[] } }) => {
        setAnimals(res.data.animals);
      })
      .catch((err: any) => {
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
      findAllAnimals();
    }
  }, [token]);

  return (
    <>
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
        onPress={() => {router.push("/new/animal")}}
      >
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      <ScreenHeader text="Catálogo de Animais" />
      <FlatList
        style={{
          width: "100%",
          backgroundColor: "#0984E3",
        }}
        data={animals}
        renderItem={({ index, item }) => (
          <Animal
            key={index}
            id={item.id}
            name={item.name}
            specie_name={item.specie_name}
            convervation_status={item.convervation_status as ConservationStatus}
            size={item.size}
            url_image={item.url_image}
          />
        )}
      />
    </>
  );
}
