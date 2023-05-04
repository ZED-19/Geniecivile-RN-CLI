import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EmbedFile from '../../components/embedFile';
import themes from '../../config/theme';
import {useSelector, useDispatch} from 'react-redux';
import {removeFile, removeAll} from '../../redux/reducers/bookmarkSlice';
import {openFile} from '../../redux/reducers/fileSlice';
import Icon, {icons} from '../../assets/icons';

function BookmarkScreen() {
  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

  const dispatch = useDispatch();
  const {idsList, filesList} = useSelector(state => state.bookmarks);

  const clearAll = () => {
    Alert.alert('Supprimer Tout', 'Etes-vous sur ?', [
      {text: 'Annuler'},
      {
        text: 'Supprimer',
        onPress: () => dispatch(removeAll()),
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.pageTitle, {color: theme.primaryColor}]}>
          favoris
        </Text>
        <TouchableOpacity
          style={styles.toTrash}
          onPress={() => (idsList.length == 0 ? null : clearAll())}>
          <Icon src={icons.trash} size={27.5} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filesList}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={item => (
          <View>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  openFile({fileName: item.item.file, fileId: item.item.id}),
                )
              }
              style={[
                styles.moduleContainer,
                {borderColor: theme.primaryColor},
              ]}>
              <Text style={[styles.moduleName, {color: theme.textColor}]}>
                {item.item.file}
              </Text>
              <TouchableOpacity
                style={styles.pb}
                onPress={() =>
                  dispatch(
                    removeFile({
                      fileName: item.item.file,
                      fileId: item.item.id,
                    }),
                  )
                }>
                <Icon src={icons.remove} size={22.5} color={theme.primaryColor} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
      <EmbedFile />
    </SafeAreaView>
  );
}

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  toTrash: {
    paddingHorizontal: 35,
    paddingVertical: 7.5,
  },
  pageTitle: {
    marginHorizontal: 25,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 27.5,
    textTransform: 'uppercase',
    fontFamily: 'SofiaSans-Bold',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
  moduleContainer: {
    borderWidth: 1.5,
    borderRadius: 5,
    marginVertical: 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleName: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 12.5,
    width: '70%',
    fontFamily: 'SofiaSans-Regular',
  },
  pb: {
    paddingRight: 10,
    paddingLeft: 20,
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    right: 0,
  },
});
