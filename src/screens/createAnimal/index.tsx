import { View, Image, TextInput, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { Button } from "../../components/button";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../api";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ScreenHeader } from "../../components/screen-header";
import { getAuthenticated } from "../../getAuthenticated";

export default function CreateAnimal(props: any) {
  const [name, set_name] = useState("");
  const [specie_name, set_specie_name] = useState("");
  const [size, set_size] = useState(0);
  const [conservation_status, set_conservation_status] =
    useState<ConservationStatus>("NOT_AVALUATED");
  const [ecological_function, set_ecological_function] = useState("");
  const [threat_causes, set_threat_causes] = useState("Desmatamento,Poluição");
  const [url_image, set_url_image] = useState<ImagePicker.ImagePickerAsset>();

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
    const tokenInfor = await getAuthenticated();
    tokenInfor.isAuthenticated;
    if (tokenInfor.isAuthenticated) {
      await api
        .post("v2/animals", {
          name,
          specie_name,
          size,
          conservation_status,
          ecological_function,
          threat_causes,
          image: url_image?.base64!,
        }, {
          headers: {
            Authorization: `Bearer ${tokenInfor.token}`,
          }
        })
        .then((res) => {
          props.navigation.goBack();
        })
        .catch((err) => console.log(err.response.data));
    }
  }

  return (
    <ScrollView>
      <ScreenHeader
        text={"Criar Animal"}
        leftIcon={{
          icon: <AntDesign name="arrowleft" size={30} color="black" />,
          action: () => {
            props.navigation.goBack();
          },
        }}
      />
      <View style={styles.container}>
        <Button onPress={openImagePicker}>
          <Image style={styles.imageAnimal} source={{ uri: url_image?.uri }} />
        </Button>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={set_name}
          placeholder="Nome"
        />
        <TextInput
          style={styles.textInput}
          value={specie_name}
          onChangeText={set_specie_name}
          placeholder="Espécie"
        />

        <Text>TAMANHO EM CM</Text>
        <TextInput
          style={styles.textInput}
          value={size.toString()}
          onChangeText={(change) => set_size(Number(change))}
          placeholder="Tamanho em centímetros"
          keyboardType="numeric"
        />

        <Picker
          style={styles.select}
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

        {/* <TextInput
          style={styles.textInput}
          value={threat_causes}
          onChangeText={set_threat_causes}
          placeholder="causas de ameaça"
        /> */}

        <TextInput
          style={{ height: 128, textAlignVertical: "top", ...styles.textInput }}
          value={ecological_function}
          onChangeText={set_ecological_function}
          placeholder="Função ecológica"
          multiline
        />
        <Button style={styles.button} onPress={createAnimal}>
          <Text>Salvar</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
