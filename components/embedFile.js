import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";

import { useSelector, useDispatch } from "react-redux";
import { closeFile } from "../redux/reducers/fileSlice";
import themes from "../config/theme";
import Icon, { icons } from "../assets/icons";

function EmbedFile() {
  const { value } = useSelector((state) => state.theme);
  const theme = value ? themes.dark : themes.light;

  const { fileName, fileId, visibility } = useSelector((state) => state.file);
  const dispatch = useDispatch();

  return (
    <Modal visible={visibility} animationType={"slide"}>
      <SafeAreaView
        style={[styles.modalContainer, { backgroundColor: theme.background }]}
      >
        <View
          style={[styles.modalHeader, { backgroundColor: theme.background }]}
        >
          <Text style={[styles.modalTitle, { color: theme.textColor }]}>
            {fileName}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(closeFile())}
            style={styles.pressableCloseContainer}
          >
            <Icon src={icons.close} size={25} color={theme.textColor}/>
          </TouchableOpacity>
        </View>
        <View style={styles.embedFile}>
          <WebView
            onShouldStartLoadWithRequest={false}
            source={{
              uri: `https://drive.google.com/file/d/${fileId}/preview`,
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default EmbedFile;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "flex-end",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingVertical: 5,
  },
  modalTitle: {
    fontSize: 15,
    paddingVertical: 5,
    fontWeight: "500",
    width: "70%",
  },
  pressableCloseContainer: {
    paddingRight: 25,
    paddingLeft: 50,
  },
  embedFile: {
    flex: 1,
  },
});
