import React from 'react';
import {FlatList,Button} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    return (
        <FlatList data={userProducts} keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price}
        onSelect={() => {}}
        >
             <Button color={Colors.primary} title='View Details' onPress={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}/>
                <Button color={Colors.primary} title='To Cart' onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
        }} />
        </ProductItem>}/>
    )
}

UserProductsScreen.navigationOptions =navData => {
    return{
        headerTitle: 'User Products',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'md-menu'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    }
   
}

export default UserProductsScreen
