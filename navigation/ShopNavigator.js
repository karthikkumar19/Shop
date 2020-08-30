import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import ProductsOverviewScreen,{screenOptions as productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';

import ProductDetailScreen,{screenOptions as productDetailScreenOptions} from '../screens/shop/ProductDetailScreen';
import OrdersScreen, {screenOptions as ordersScreenOptions} from '../screens/shop/OrdersScreen';
import CartScreen,{screenOptions as cartScreenOptions} from '../screens/shop/CartScreen';
import AuthScreen,{screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import UserProductsScreen ,{screenOptions as userProductsScreenOptions} from '../screens/user/UserProductsScreen';
import EditProductScreen ,{screenOptions as editProductsScreenOptions}from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return ( <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen name="ProductsOverview"
         component={ProductsOverviewScreen}
         options={productsOverviewScreenOptions} />
        <ProductsStackNavigator.Screen name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions} />
        <ProductsStackNavigator.Screen name="Cart"
        component={CartScreen} 
        options={cartScreenOptions}/>

    </ProductsStackNavigator.Navigator>
    )
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
                <OrdersStackNavigator.Screen name="Orders"
                component={OrdersScreen}
                options={ordersScreenOptions} />
        </OrdersStackNavigator.Navigator>
    );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return(
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen name="UserProducts"
            component={UserProductsScreen} 
            options={userProductsScreenOptions}/>
            <AdminStackNavigator.Screen name="EditProduct"
            component={EditProductScreen}
            options={editProductsScreenOptions} />

        </AdminStackNavigator.Navigator>
    )
}

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator drawerContent={
            props => {
                        return <View style={{flex:1,paddingTop:20}}>
                            <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                                <DrawerItemList {...props} />
                                <Button title='Logout' color={Colors.primary} 
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    // props.navigation.navigate('Auth');
                                }} />
                            </SafeAreaView>
                        </View>
                    }
        } 
        drawerContentOptions={
            {
                activeTintColor:Colors.primary
            }
        }>
            <ShopDrawerNavigator.Screen name="Products" 
            component={ProductsNavigator} 
            options={
                {
            drawerIcon: props => ( 
              <Ionicons name='md-cart' size={23} color={props.Color} /> )
                        }
            } />
              <ShopDrawerNavigator.Screen name="Orders" 
            component={OrdersNavigator} options={
                {
             drawerIcon: props => ( 
         <Ionicons name='md-list' size={23} color={props.Color} /> )
                        }
            } />
              <ShopDrawerNavigator.Screen name="Admin" 
            component={AdminNavigator}
            options={
                {
                 drawerIcon: props => ( 
                 <Ionicons name='md-create' size={23} color={props.Color} /> )
                        }
            } />
        </ShopDrawerNavigator.Navigator>
    )
}

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail:ProductDetailScreen,
//     Cart:CartScreen
// },{
//     navigationOptions:{
//         drawerIcon: drawerConfig => ( 
//         <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} /> )
//     },
//     defaultNavigationOptions:defaultNavOptions
// })


// const OrdersNavigator = createStackNavigator({
//     Orders:OrdersScreen
// },{
//     navigationOptions:{
//         drawerIcon: drawerConfig => ( 
//         <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} /> )
//     },
//     defaultNavigationOptions:defaultNavOptions
// })

// const AdminNavigator = createStackNavigator({
//     UserProducts:UserProductsScreen,
//     EditProduct: EditProductScreen
// },{
//     navigationOptions:{
//         drawerIcon: drawerConfig => ( 
//         <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} /> )
//     },
//     defaultNavigationOptions:defaultNavOptions
// })

 

// const ShopNavigator = createDrawerNavigator({
//     Products :ProductsNavigator,
//     Orders:OrdersNavigator,
//     Admin: AdminNavigator,
// },{
//     contentOptions:{
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         return <View style={{flex:1,paddingTop:20}}>
//             <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
//                 <DrawerNavigatorItems {...props} />
//                 <Button title='Logout' color={Colors.primary} 
//                 onPress={() => {
//                     dispatch(authActions.logout());
//                     // props.navigation.navigate('Auth');
//                 }} />
//             </SafeAreaView>
//         </View>
//     }
// })

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen}
            options={authScreenOptions} />
        </AdminStackNavigator.Navigator>
    )
}

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// },{
//     defaultNavigationOptions:defaultNavOptions
// })

// const MainNavigator = createSwitchNavigator({
//     Startup:StartupScreen,
//     Auth:AuthNavigator,
//     Shop:ShopNavigator,
// })

// export default createAppContainer(MainNavigator);