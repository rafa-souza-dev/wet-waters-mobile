import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: "center",
        gap: 12,
        backgroundColor: "#0984E3",
        paddingBottom: 120
      },
      imageAnimal: { width: 256, height: 256, borderRadius: 10, backgroundColor: "#fff" },
      textInput: { width: "90%", backgroundColor: "#fff", color: "#000", borderRadius: 16, padding: 12 },
      select: {width: 256, backgroundColor: "#fff"},
      button: {width: "90%", backgroundColor: "#0BE6A8", padding: 12, borderRadius: 16, alignItems: "center"},
      buttonBack: { left: "5%", backgroundColor: "#fff", padding: 12, borderRadius: 30, alignSelf: "flex-start", alignItems: "center" }
})