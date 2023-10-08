import { View, Image, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Point } from "../../components/point";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { ScreenHeader } from "../../components/screen-header";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const ConservationStatusColor = {
  EXTINCT: { name: "Extinto", color: "#8B0000" },
  EXTINCT_IN_THE_WILD: { name: "Extinto na Selva", color: "#800000" },
  CRITICAL_ENDANGERED: { name: "Perigo", color: "#990000" },
  ENDANGERED: { name: "Ameaçado", color: "#E0115F" },
  VULNERABLE: { name: "Vulnerável", color: "#DC143C" },
  NEAR_THREATENED: { name: "Quase Ameaçado", color: "#D2691E" },
  LEAST_CONCERN: { name: "Menor Precupação", color: "#FA8072" },
  DATA_DEFICIENT: { name: "Dados Deficientes", color: "#858585" },
  NOT_AVALUATED: { name: "Não Avaliado", color: "#000000" },
};

export default function AnimalInfor() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [specieName, setSpecieName] = useState("");
  const [size, setSize] = useState(0);
  const [conservation, setConservation] =
    useState<ConservationStatus>("NOT_AVALUATED");
  const [ecologicalFunction, setEcologicalFunction] = useState("");
  const [urlImage, setUrlImage] = useState();
  const [threatCauses, setThreatCauses] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  async function getAnimal() {
    await api
      .get(`v1/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.animal.name);
        setSize(response.data.animal.size);
        setSpecieName(response.data.animal.specie_name);
        setConservation(response.data.animal.conservation_status);
        setEcologicalFunction(response.data.animal.ecological_function);
        setUrlImage(response.data.animal.url_image);
        setThreatCauses(response.data.animal.threat_causes);
      });
  }

  async function getToken() {
    const tokenInfor = await SecureStore.getItemAsync("token");
    setToken(tokenInfor);
  }

  useEffect(() => {
    getToken();
    if (!!token) {
      getAnimal();
    }
  }, [token]);

  return (
    <ScrollView style={{ backgroundColor: "#0984E3" }}>
      <ScreenHeader
        text={name}
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            router.push("/");
          },
        }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          alignSelf: "center",
          marginTop: 10,
          borderRadius: 16,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {specieName}
        </Text>
        <Image
          style={{
            width: "90%",
            height: 256,
            borderRadius: 10,
            backgroundColor: "#fff",
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: urlImage }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Point color={ConservationStatusColor[conservation].color} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {ConservationStatusColor[conservation].name}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: 16,
            fontSize: 16,
          }}
        >
          tamanho médio: <Text style={{ color: "#0984E3" }}>{size / 100}m</Text>
        </Text>
        <Text
          style={{
            textAlignVertical: "top",
            fontSize: 14,
            padding: 16,
            textAlign: "justify",
          }}
        >
          {ecologicalFunction}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            paddingLeft: 16,
          }}
        >
          Causas de Ameaça:
        </Text>
        <ScrollView
          horizontal
          style={{
            width: "90%",
            marginLeft: 16,
          }}
        >
          <View
            style={{
              gap: 6,
              flex: 1,
              flexDirection: "row",
            }}
          >
            {threatCauses.map((cause, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#808080",
                  borderRadius: 30,
                  padding: 16,
                }}
              >
                <Text>{cause}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
