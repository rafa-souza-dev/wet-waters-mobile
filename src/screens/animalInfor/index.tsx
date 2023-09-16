import { View, Image, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { api } from "../../api";
import { Point } from "../../components/point";
import React from "react";
import { ScreenHeader } from "../../components/screen-header";
import { AntDesign } from "@expo/vector-icons";
import { getAuthenticated } from "../../getAuthenticated";

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

export function AnimalInfor(props: any) {
  const id = props.route.params.id;
  const [name, setName] = useState("");
  const [specieName, setSpecieName] = useState("");
  const [size, setSize] = useState(0);
  const [conservation, setConservation] =
    useState<ConservationStatus>("NOT_AVALUATED");
  const [ecologicalFunction, setEcologicalFunction] = useState("");
  const [urlImage, setUrlImage] = useState();
  const [threatCauses, setThreatCauses] = useState([]);

  async function getAnimal() {
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .get(`v1/animals/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
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
  }

  useEffect(() => {
    getAnimal();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ScreenHeader
        text={name}
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            props.navigation.goBack();
          },
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.textSpecieName}>{specieName}</Text>
        <Image style={styles.imageAnimal} source={{ uri: urlImage }} />
        <View style={styles.containerConservationStatus}>
          <Point color={ConservationStatusColor[conservation].color} />
          <Text style={styles.textConservationStatus}>
            {ConservationStatusColor[conservation].name}
          </Text>
        </View>
        <Text style={styles.textSize}>
          tamanho médio: <Text style={styles.textBlue}>{size / 100}m</Text>
        </Text>
        <Text style={styles.textEcologicalFunction}>{ecologicalFunction}</Text>
        <Text style={styles.titleThreatCauses}>Causas de Ameaça:</Text>
        <ScrollView horizontal style={styles.scrollViewThreatCauses}>
          <View style={styles.contentThreatCauses}>
            {threatCauses.map((cause, index) => (
              <View key={index} style={styles.viewThreatCauses}>
                <Text>{cause}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
