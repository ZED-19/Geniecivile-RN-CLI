import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import themes from '../../config/theme';
import {useSelector} from 'react-redux';
import ChildFolder from '../../components/childFolder';
import Icon, { icons } from '../../assets/icons';

export default function ChildrenScreen({navigation, route}) {
  const parentName = route.params.parentName;
  const children = route.params.children;

  // -----------------------------------------

  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

  const navToFolder = item => {
    navigation.navigate('FILES', {
      folderName: item.parent,
      folderFiles: item.files,
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <View style={styles.headerContainer}>
          <Icon src={icons.back} color={theme.textColor} size={25}/>
          <Text style={[styles.pageTitle, {color: theme.textColor}]}>
            {parentName}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <FlatList
          data={children}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ChildFolder item={item} onPress={() => navToFolder(item)} key={item.id}/>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 2.5,
    marginTop: 5,
  },
  pageTitle: {
    fontSize: 25,
    marginLeft: 7.5,
    marginRight: 5,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
  },
});
