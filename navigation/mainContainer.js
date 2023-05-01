import * as React from 'react';
import {StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeRouteScreen from './screens/homeRouteScreen';
import BookmarkScreen from './screens/bookmarkScreen';
import SettingsScreen from './screens/settingScreens';

import themes from '../config/theme';
import {useSelector} from 'react-redux';

import {icons} from '../assets/icons';
import { SvgXml } from 'react-native-svg';

const homeName = 'Domicile';
const settName = 'Paramètres';
const favName = 'Favoris';

const Tab = createBottomTabNavigator();

function MAinContainer({navigation}) {
  const {value} = useSelector(state => state.theme);
  const theme = value ? themes.dark : themes.light;

  const activeIcon = theme.primaryColor;
  const inactiveIcon = theme.inactiveIconColor;

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.barStyle}
        backgroundColor={theme.background}
        animated={true}
      />
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: activeIcon,
          tabBarInactiveTintColor: inactiveIcon,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarLabelStyle: {},
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopColor: theme.background,
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? icons.home : icons.homeOutline;
            } else if (rn === favName) {
              iconName = focused ? icons.bookmarks : icons.bookmarksOutline;
            } else if (rn === settName) {
              iconName = focused ? icons.settings : icons.settingsOutline;
            }

            return <SvgXml xml={iconName} width={size} height={size} fill={theme.primaryColor} color={theme.primaryColor}/>;
          },
        })}>
        <Tab.Screen name={homeName} component={HomeRouteScreen} />
        <Tab.Screen name={favName} component={BookmarkScreen} />
        <Tab.Screen name={settName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MAinContainer;
