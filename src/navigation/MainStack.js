import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{headerShown: false}}>
      <>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </>
    </Stack.Navigator>
  );
}
