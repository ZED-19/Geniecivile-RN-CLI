import {
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Icon, {icons} from '../assets/icons';
import Pdf from 'react-native-pdf';

function AboutModal(props) {
  const source = {
    uri: 'https://drive.google.com/uc?export=download&id=12_vMgKbPES0bmFsFNa_ePokpCInvlj0e',
    cache: true,
  };

  return (
    <Modal visible={props.visible} animationType={'slide'}>
      <SafeAreaView
        style={[
          styles.modalContainer,
          {backgroundColor: props.theme.background},
        ]}>
        <TouchableOpacity
          onPress={props.onClose}
          style={[
            styles.modalHeader,
            {backgroundColor: props.theme.primaryColor},
          ]}>
          <Icon src={icons.down} color={props.theme.background} size={20} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Pdf
            source={source}
            style={styles.pdf}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default AboutModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalHeader: {
    paddingHorizontal: 50,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
