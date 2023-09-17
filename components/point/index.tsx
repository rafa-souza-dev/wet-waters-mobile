import { ColorValue, View } from "react-native";
import { styles } from "./styles";

interface PointProps {
    color?: ColorValue;
}

export function Point({ color }: PointProps = { color: "#fff" }) {
  return <View style={{ backgroundColor: color, ...styles.point }} />;
}