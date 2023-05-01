import * as React from 'react';
import {StyleSheet, FlatList, SafeAreaView, Dimensions} from 'react-native';
import Data from '../../src/filtered.json';
import HomeHeader from '../../components/homeHeader';

import themes from '../../config/theme';
import {useSelector} from 'react-redux';
import SearchList from '../../components/searchList';
import {useState} from 'react';

import ChildFolder from '../../components/childFolder';
import ParentsFolder from '../../components/parentsFolder';

export default function HomeScreen({navigation}) {
  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

  const {listDisplay} = useSelector(state => state.search);

  const [foundedFiles, setFiles] = useState([]);

  const getData = enteredValue => {
    const foundedFiles = [];
    const regExp = new RegExp(enteredValue, 'gi');
    if (enteredValue != '') {
      for (let index = 0; index < Data.length; index++) {
        if (Data[index].files) {
          const folder = Data[index].files;
          for (let i = 0; i < folder.length; i++) {
            const result = regExp.test(folder[i].file);
            result == true ? foundedFiles.push(folder[i]) : null;
          }
        } else if (Data[index].childrens) {
          for (let II = 0;II < Data[index].childrens.length;II++) {
            const folder = Data[index].childrens[II].files;
            for (let i = 0; i < folder.length; i++) {
              const result = regExp.test(folder[i].file);
              result == true ? foundedFiles.push(folder[i]) : null;
            }
          }
        }
      }
      setFiles(foundedFiles);
    }
  };

  const navToFolder = item => {
    navigation.navigate('FILES', {
      folderName: item.parent,
      folderFiles: item.files,
    });
  };

  const navToParent = item => {
    navigation.navigate('CHILDREN', {
      parentName: item.parent,
      children: item.childrens,
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
      <HomeHeader searchFunction={enteredValue => getData(enteredValue)} />
      <SearchList data={foundedFiles} />
      <FlatList
        overScrollMode={'never'}
        style={[styles.listContainer, {display: listDisplay}]}
        data={Data}
        keyExtractor={item => item.parent}
        renderItem={({item}) => {
          if (item.childrens) {
            return (
              <ParentsFolder item={item} onPress={() => navToParent(item)} />
            );
          } else {
            return (
              <ChildFolder item={item} onPress={() => navToFolder(item)} />
            );
          }
        }}
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
  listContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
  },
  moduleContainer: {
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 7.5,
    paddingVertical: 10,
    marginVertical: 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleName: {
    fontSize: 15,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    fontSize: 15,
  },
});
