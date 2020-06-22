import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';


const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-reg',
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans-reg'
    },
    headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => ( 
        <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} /> )
    },
    defaultNavigationOptions:defaultNavOptions
})


const OrdersNavigator = createStackNavigator({
    Orders:OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => ( 
        <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} /> )
    },
    defaultNavigationOptions:defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts:UserProductsScreen,
    EditProduct: EditProductScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => ( 
        <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} /> )
    },
    defaultNavigationOptions:defaultNavOptions
})

 

const ShopNavigator = createDrawerNavigator({
    Products :ProductsNavigator,
    Orders:OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator);