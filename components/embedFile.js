import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {closeFile} from '../redux/reducers/fileSlice';
import themes from '../config/theme';
import Icon, {icons} from '../assets/icons';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util'

function EmbedFile() {
  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;
  const [pagesInfo, setPages] = useState({x: 0, y: 0});
  const [isReady, setReadyState] = useState(false);

  const {fileName, fileId, visibility} = useSelector(state => state.file);
  const dispatch = useDispatch();

  const src = {
    uri: 'https://drive.google.com/uc?export=download&id=' + fileId,
    cache: true,
  };

  return (
    <Modal visible={visibility} animationType={'slide'}>
      <SafeAreaView
        style={[styles.modalContainer, {backgroundColor: theme.background}]}>
        <View style={[styles.modalHeader, {backgroundColor: theme.background}]}>
          <Text style={[styles.modalTitle, {color: theme.textColor}]}>
            {fileName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(closeFile());
              setReadyState(false);
            }}
            style={styles.pressableCloseContainer}>
            <Icon src={icons.close} size={25} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.embedFile}>
          <Pdf
            trustAllCerts={false}
            source={src}
            style={[styles.pdf]}
            onError={error => console.log(error)}
            onPageChanged={(x, y) => setPages({x: x, y: y})}
            onLoadComplete={() => setReadyState(true)}
            renderActivityIndicator={x => (
              <Text style={{color: theme.primaryColor, textAlign: 'center'}}>
                {(x * 100).toString().slice(0, 5)}%{'\n'}
                Chargement
              </Text>
            )}
          />
        </View>
        <View
          style={[
            styles.counterContainer,
            {
              backgroundColor: theme.primaryColor,
              display: isReady ? 'flex' : 'none',
            },
          ]}>
          <Text style={{color: theme.textColor}}>
            {pagesInfo.x}/{pagesInfo.y}
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default EmbedFile;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingVertical: 5,
  },
  modalTitle: {
    fontSize: 15,
    paddingVertical: 5,
    fontWeight: '500',
    width: '70%',
    fontFamily: 'SofiaSans-Bold',
  },
  pressableCloseContainer: {
    paddingRight: 25,
    paddingLeft: 50,
  },
  embedFile: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    opacity: 0.8,
  },
});
