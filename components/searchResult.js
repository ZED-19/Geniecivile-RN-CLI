import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import themes from '../config/theme';
import {useSelector, useDispatch} from 'react-redux';
import {openFile} from '../redux/reducers/fileSlice';

function SearchResult(props) {
  const dispatch = useDispatch();

  // Get theme
  const {value} = useSelector(state => state.theme);
  const theme = value == true ? themes.dark : themes.light;

  const info = props.info;
  const {file, id} = info.item;
  const {index} = info;

  return (
    <View style={[styles.container, {borderColor: theme.textColor}]}>
      <TouchableOpacity
        onPress={() => dispatch(openFile({fileName: file, fileId: id}))}>
        <Text style={{color: theme.textColor, fontFamily: "SofiaSans-Regular"}}>
          {index + 1}• {file}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomWidth: 2,
    marginHorizontal: 25,
  },
});
