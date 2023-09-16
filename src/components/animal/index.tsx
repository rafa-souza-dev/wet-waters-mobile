import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../button";

export interface AnimalProps {
  id: number;
  name: string;
  specie_name: string;
  size: number;
  convervation_status: ConservationStatus;
  url_image: string;
  infor: (id: number) => void;
}

export function Animal({
  id,
  name,
  specie_name,
  size,
  convervation_status,
  url_image,
  infor,
}: AnimalProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: url_image }} style={styles.animalImage} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text>Espécie: {specie_name}</Text>
        <Text>{size / 100}m</Text>
        <View
          style={{
            ...styles.conservationContainer,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "red" }}>{convervation_status}</Text>
        </View>
        <Button style={styles.knowMore} onPress={() => infor(id)}>
          <Text>saiba mais...</Text>
        </Button>
      </View>
    </View>
  );
}
