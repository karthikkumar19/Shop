import React from 'react';
import {Text,FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import OrderItem from '../../components/Shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)
    return (
      <FlatList data={orders} keyExtractor={item => item.id} 
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} 
      date={itemData.item.readableDate} items={itemData.item.items}/>}
       />
    )
}


OrdersScreen.navigationOptions =navData => {
    return{
        headerTitle: 'Your Orders',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'md-menu'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
       
    }
   
}

export default OrdersScreen;
