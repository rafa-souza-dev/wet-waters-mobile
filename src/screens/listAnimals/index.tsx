import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Animal, AnimalProps } from "../../components/animal";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { AntDesign } from "@expo/vector-icons";
import { DrawerProvider } from "../../components/drawer-menu";
import { ScreenHeader } from "../../components/screen-header";
import { Entypo } from "@expo/vector-icons";
import { getAuthenticated } from "../../getAuthenticated";

export function ListAnimals(props: any) {
  const [animals, setAnimals] = useState<AnimalProps[]>([]);
  const [isOpenLeftMenu, setIsOpenLeftMenu] = React.useState(false);

  function saia(id: number) {
    props.navigation.navigate("AnimalInfor", { id });
  }

  function navigateToCreateAnimal() {
    props.navigation.navigate("CreateAnimal");
  }

  async function findAllAnimals() {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get("v1/animals", {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
          }
        })
        .then((res) => {
          setAnimals(res.data.animals);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.navigation.navigate("Login");
    }
  }

  useEffect(() => {
    props.navigation.addListener("focus", () => {
    findAllAnimals();
    });
  }, [props.navigation]);

  return (
    <DrawerProvider
      navigate={props.navigation.navigate}
      open={isOpenLeftMenu}
      screen="Animals"
      setOpen={setIsOpenLeftMenu}
    >
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
        onPress={navigateToCreateAnimal}
      >
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      <ScreenHeader
        text="Catálogo de Animais"
        leftIcon={{
          icon: (
            <Entypo name="menu" size={36} color="black" style={{ width: 30 }} />
          ),
          action: () => {
            setIsOpenLeftMenu(true);
          },
        }}
      />
      <FlatList
        style={styles.container}
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
            infor={saia}
          />
        )}
      />
    </DrawerProvider>
  );
}
