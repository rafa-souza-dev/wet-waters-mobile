import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface PostAnalysisProps {
  title: string;
  description: string;
  url_image: string | null;
}

export default function PostAnalysis({
  title,
  description,
  url_image,
}: PostAnalysisProps) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        marginVertical: 5,
        borderRadius: 12,
      }}
    >
      {url_image ? (
        <Image
          source={{ uri: url_image }}
          width={128}
          height={128}
          style={{ borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
        />
      ) : (
        <MaterialCommunityIcons name="jellyfish" size={128} color={"#0984E3"} />
      )}
      <View style={{ padding: 2 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        <Text style={{fontSize: 12, textAlign: "justify"}}>{description}</Text>
      </View>
    </View>
  );
}
