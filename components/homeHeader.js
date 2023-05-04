import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import themes from '../config/theme';
import {useSelector, useDispatch} from 'react-redux';
import Icon, {icons} from '../assets/icons';

import {openSearch, closeSearch} from '../redux/reducers/searchSlice';

export default function HomeHeader(props) {
  const dispatch = useDispatch();

  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

  const {listDisplay, searchDisplay, inputAreaWidth, inputWidth, icon} =
    useSelector(state => state.search);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.pageTitle,
          {color: theme.primaryColor, display: listDisplay},
        ]}>
        domicile
      </Text>
      <TouchableOpacity
        style={{display: searchDisplay}}
        onPress={() => dispatch(closeSearch())}>
        <Icon src={icons.back} color={theme.primaryColor} size={25} />
      </TouchableOpacity>
      <View
        style={[
          styles.inputArea,
          {borderColor: theme.primaryColor, width: inputAreaWidth},
        ]}>
        <TextInput
          placeholder="Search"
          style={{color: theme.textColor, width: inputWidth}}
          inputMode={'search'}
          onChangeText={text => {
            text == '' ? dispatch(closeSearch()) : dispatch(openSearch());
            props.searchFunction(text);
          }}
        />
        <TouchableOpacity onPress={() => dispatch(openSearch())}>
          <Icon src={icon} size={22.5} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginVertical: 12.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pageTitle: {
    fontSize: 27.5,
    textTransform: 'uppercase',
    width: '37%',
    fontFamily: 'SofiaSans-ExtraBold',
  },
  inputArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5.5,
    height: 35
  },
});
