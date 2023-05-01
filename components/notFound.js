import { StyleSheet, View, Text } from "react-native";
import themes from "../config/theme";
import { useSelector } from "react-redux";

function NotFoundView() {
  const { value } = useSelector((state) => state.theme);
  const theme = value == true ? themes.dark : themes.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Aucun Résultat
      </Text>
    </View>
  );
}

export default NotFoundView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 25,
  },
  icon: {
    height: 250,
    marginRight: 5,
  },
});
