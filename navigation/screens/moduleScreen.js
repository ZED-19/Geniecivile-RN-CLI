import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import themes from '../../config/theme';
import {useSelector} from 'react-redux';

import EmbedFile from '../../components/embedFile';
import ModuleFile from '../../components/moduleFile';
import Icon, {icons} from '../../assets/icons';

export default function ModuleScreen({navigation, route}) {
  const folderName = route.params.folderName;
  const folderFiles = route.params.folderFiles;

  // -----------------------------------------

  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

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
          <Icon src={icons.back} color={theme.textColor} size={25} />
          <Text style={[styles.pageTitle, {color: theme.textColor}]}>
            {folderName}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <FlashList
          estimatedItemSize={200}
          data={folderFiles}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ModuleFile info={{name: item.file, id: item.id}} />
          )}
        />
      </View>
      <EmbedFile />
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
    fontFamily: 'SofiaSans-Bold',
  },
  listContainer: {
    width: '100%',
    flex: 1,
  },
});
