import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { backgroundColor: "#0984E3" },
  content: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  textSpecieName: {
    fontStyle: "italic",
    textAlign: "center"
  },
  imageAnimal: {
    width: "90%",
    height: 256,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    resizeMode: "contain"
  },
  textEcologicalFunction: {
    textAlignVertical: "top",
    fontSize: 14, padding: 16,
    textAlign: "justify"
  },
  containerConservationStatus: {
    flexDirection: "row",
    alignItems: "center"
  },
  textConservationStatus: {
    fontSize: 16,
    fontWeight: "bold"
  },
  textSize: {
    marginLeft: 16,
    fontSize: 16
  },
  textBlue: { color: "#0984E3" },
  titleThreatCauses: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 16
  },
  scrollViewThreatCauses: {
    width: "90%",
    marginLeft: 16
  },
  contentThreatCauses: {
    gap: 6,
    flex: 1,
    flexDirection: "row"
  },
  viewThreatCauses: {
    backgroundColor: "#808080",
    borderRadius: 30,
    padding: 16
  }

});