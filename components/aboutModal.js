import {
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text
} from "react-native";
import Icon, { icons } from "../assets/icons";

function AboutModal(props) {
  return (
    <Modal visible={props.visible} animationType={"slide"}>
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: props.theme.background },
        ]}
      >
        <TouchableOpacity
          onPress={props.onClose}
          style={[
            styles.modalHeader,
            { backgroundColor: props.theme.primaryColor },
          ]}
        >
          <Icon src={icons.down} color={props.theme.background} size={20}/>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

export default AboutModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalHeader: {
    paddingHorizontal: 50,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
