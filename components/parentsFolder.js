import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import themes from '../config/theme';
import Icon, {icons} from '../assets/icons';

function ParentsFolder(props) {
  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;
  const item = props.item;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.moduleContainer, {borderColor: theme.primaryColor}]}>
        <Text style={[styles.moduleName, {color: theme.textColor}]}>
          {item.parent}
        </Text>
        <View style={styles.counterContainer}>
          <Text style={[styles.counter, {color: theme.textColor}]}>
            {item.childrens.length + ' '}
          </Text>
          <Icon color={theme.primaryColor} size={20} src={icons.folder} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default ParentsFolder;
