import { View, Image, TextInput, ScrollView, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { ScreenHeader } from "../../components/screen-header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import Checkbox from 'expo-checkbox';

type ThreatCause = {
  id: number
  description: string
  isSelected?: boolean
}

export default function CreateAnimal() {
  const [name, set_name] = useState("");
  const [specie_name, set_specie_name] = useState("");
  const [size, set_size] = useState(0);
  const [conservation_status, set_conservation_status] =
    useState<ConservationStatus>("NOT_AVALUATED");
  const [ecological_function, set_ecological_function] = useState("");
  const [threat_causes, set_threat_causes] = useState<Array<ThreatCause>>([]);
  const [url_image, set_url_image] = useState<ImagePicker.ImagePickerAsset>();
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

  async function createAnimal() {
    await api
      .post(
        "v2/animals",
        {
          name,
          specie_name,
          size,
          conservation_status,
          ecological_function,
          image: url_image?.base64!,
          threat_causes: selectedCausesString
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        router.push("/animals");
      })
      .catch((err) => console.log(err.response.data));
  }

  async function getTokenAndListThreatCauses() {
    const tokenInfor = await SecureStore.getItemAsync("token");

    setToken(tokenInfor);

    await api
      .get("/v1/threat-causes", {
        headers: {
          Authorization: `Bearer ${tokenInfor}`,
        },
      })
      .then((res) => {
        const data: { threat_causes: ThreatCause[] } = res.data
        const threat_causes = data.threat_causes

        set_threat_causes(threat_causes.map(cause => {
          cause.isSelected = false

          return cause
        }))
      })
      .catch((err: any) => console.log(err.response.data));
  }

  function handleChangeSelectedCause(causeID: number) {
    set_threat_causes(state => state.map(cause => {
      if (cause.id === causeID) {
        cause.isSelected = !cause.isSelected
      }

      return cause
    }))
  }

  useEffect(() => {
    getTokenAndListThreatCauses();
  }, [token]);

  const selectedCausesString = threat_causes
    .filter(cause => cause.isSelected)
    .map(cause => cause.description)
    .join(',')

  return (
    <ScrollView>
      <ScreenHeader
        text={"Criar Animal"}
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            router.push("/animals");
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
          value={name}
          onChangeText={set_name}
          placeholder="Nome"
        />
        <TextInput
          style={{
            width: "90%",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 16,
            padding: 12,
          }}
          value={specie_name}
          onChangeText={set_specie_name}
          placeholder="Espécie"
        />

        <Text>TAMANHO EM CM</Text>
        <TextInput
          style={{
            width: "90%",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 16,
            padding: 12,
          }}
          value={size.toString()}
          onChangeText={(change) => set_size(Number(change))}
          placeholder="Tamanho em centímetros"
          keyboardType="numeric"
        />

        <View style={styles.container}>
          {threat_causes.map((threatCause) => (
            <View key={threatCause.id} style={styles.section}>
              <Checkbox 
                style={styles.checkbox}
                value={threatCause.isSelected} 
                onValueChange={() => {handleChangeSelectedCause(threatCause.id)}}
              />
              <Text style={styles.paragraph}>{threatCause.description}</Text>
            </View>
          ))}
        </View>

        <Picker
          style={{ width: 256, backgroundColor: "#fff" }}
          selectedValue={conservation_status}
          onValueChange={(itemValue) => set_conservation_status(itemValue)}
        >
          <Picker.Item label="Extinto" value={"EXTINCT"} />
          <Picker.Item label="Extinto na Selva" value={"EXTINCT_IN_THE_WILD"} />
          <Picker.Item label="Perigo" value={"CRITICAL_ENDANGERED"} />
          <Picker.Item label="Ameaçado" value={"ENDANGERED"} />
          <Picker.Item label="Vulnerável" value={"VULNERABLE"} />
          <Picker.Item label="Quase Ameaçado" value={"NEAR_THREATENED"} />
          <Picker.Item label="Menor Precupação" value={"LEAST_CONCERN"} />
          <Picker.Item label="Dados Deficientes" value={"DATA_DEFICIENT"} />
          <Picker.Item label="Não Avaliado" value={"NOT_AVALUATED"} />
        </Picker>

        <TextInput
          style={{
              width: "90%",
            height: 268,
            textAlignVertical: "top",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 12,
          }}
          value={ecological_function}
          onChangeText={set_ecological_function}
          placeholder="Função ecológica"
          multiline
        />
        <TouchableOpacity
          style={{
            width: 350,
            backgroundColor: "#0BE6A8",
            padding: 12,
            borderRadius: 16,
            alignItems: "center",
          }}
          onPress={createAnimal}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
