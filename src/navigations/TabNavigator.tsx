import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView overlayColor="" blurAmount={15} style={styles.blurView} />
        ),
      }}>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="home"
              size={24}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CART"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="cart"
              size={24}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FAVOURITE"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="like"
              size={24}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ORDER_HISTORY"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="bell"
              size={24}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    elevation: 0,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
