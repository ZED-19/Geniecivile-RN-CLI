import {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Share,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Linking} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../../redux/reducers/themeSlice';
import themes from '../../config/theme';
import AboutModal from '../../components/aboutModal';
import Icon, {icons} from '../../assets/icons';

export default function SettingsScreen() {
  const {value} = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const theme = value ? themes.dark : themes.light;
  const [visibility, setVisibility] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.geniecivile.proapp',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.pageTitle, {color: theme.primaryColor}]}>
        paramètres
      </Text>
      <View style={styles.settingsList}>
        <View style={styles.darkContainer}>
          <Text style={[styles.darkTitle, {color: theme.textColor}]}>
            Mode Sombre
          </Text>
          <Switch value={value} onValueChange={() => dispatch(setTheme())} />
        </View>
        <View style={styles.rowListContainer}>
          <TouchableOpacity
            style={[styles.rowChild, {borderColor: theme.textColor}]}
            onPress={() => Linking.openURL('mailto:zedmb19@gmail.com')}>
            <Icon src={icons.mail} size={45} color={theme.textColor} />
            <Text style={[styles.rowChildTitle, {color: theme.textColor}]}>
              contacter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowChild, {borderColor: theme.textColor}]}>
            <Icon src={icons.halfStar} size={45} color={theme.textColor} />
            <Text style={[styles.rowChildTitle, {color: theme.textColor}]}>
              Évaluez Nous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowChild, {borderColor: theme.textColor}]}
            onPress={() => setVisibility(true)}>
            <Icon src={icons.people} size={45} color={theme.textColor} />
            <Text style={[styles.rowChildTitle, {color: theme.textColor}]}>
              À Propos
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.qrCodeContainer} onPress={onShare}>
          <Text style={[styles.qrCodeTitle, {color: theme.textColor}]}>
            Partager
          </Text>
          <View style={styles.qrCode}>
            <QRCode
              value="https://play.google.com/store/apps/details?id=com.geniecivile.proapp"
              backgroundColor={'transparent'}
              color={theme.textColor}
              logo={require('../../assets/images/icon.png')}
              logoBackgroundColor={theme.background}
              logoSize={45}
              logoBorderRadius={15}
              size={200}
            />
          </View>
        </TouchableOpacity>
      </View>
      <AboutModal
        visible={visibility}
        theme={theme}
        onClose={() => setVisibility(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pageTitle: {
    marginHorizontal: 25,
    marginTop: 5,
    fontSize: 27.5,
    textTransform: 'uppercase',
    fontFamily: 'SofiaSans-Bold',
  },
  settingsList: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  darkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
  },
  darkTitle: {
    fontSize: 17.5,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'SofiaSans-Regular',
  },
  rowListContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rowChildTitle: {
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SofiaSans-Regular',
  },
  rowChild: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 1.5,
    borderRadius: 15,
    width: 95,
    height: 80,
  },
  qrCodeContainer: {
    padding: 5,
    marginTop: 15,
  },
  qrCodeTitle: {
    fontSize: 25,
    fontFamily: 'SofiaSans-Regular',
  },
  qrCode: {
    marginTop: 10,
    borderColor: themes.ThemeColors.primaryColor,
    borderWidth: 2,
    padding: 2.5,
    borderRadius: 5,
  },
});
