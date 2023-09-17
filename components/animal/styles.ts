import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
        width: "90%", flexDirection: "row", gap: 12, backgroundColor: "#fff", borderWidth: 1, borderStyle: "solid", borderColor: "#202020", borderRadius: 16, alignSelf: "center", marginVertical: 6
    },
    animalImage: { width: 140, height: 140, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
    content: { justifyContent: "center", alignItems: "flex-start", paddingVertical: 6 },
    conservationContainer: { padding: 2, marginVertical: 4, borderRadius: 2 },
    knowMore: { backgroundColor: "#0F9972", borderRadius: 16, paddingHorizontal: 6, justifyContent: "center" }
})