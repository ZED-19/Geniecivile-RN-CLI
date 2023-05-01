import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./homeScreen";
import ModuleScreen from "./moduleScreen";
import ChildrenScreen from "../screens/childrenScreen"

const Stack = createNativeStackNavigator();

export default function HomeRouteScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="FILES" component={ModuleScreen} />
      <Stack.Screen name="CHILDREN" component={ChildrenScreen}/>
    </Stack.Navigator>
  );
}
