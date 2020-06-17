import React from 'react';
import {FlatList,Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);

const selectItemHandler = (id,title) => {
    props.navigation.navigate('ProductDetail',{
        productId:id,
        productTitle:title
    })
}

    return(
        <FlatList data={products} renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price} 
        onSelect={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}
        >
             <Button color={Colors.primary} title='View Details' onPress={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
        }}/>
                <Button color={Colors.primary} title='To Cart' onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
        }} />
        </ProductItem>}/>
    )
};

ProductsOverviewScreen.navigationOptions =navData => {
    return{
        headerTitle: 'All Products',
        headerLeft : () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
        <Item title='Menu' iconName={'md-menu'} onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
            <Item title='Cart' iconName={'md-cart'} onPress={() => {
                navData.navigation.navigate('Cart')
            }} />
        </HeaderButtons>
    }
   
}

export default ProductsOverviewScreen;