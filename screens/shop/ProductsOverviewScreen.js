import React from 'react';
import {FlatList} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);
    return(
        <FlatList data={products} renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title} price={itemData.item.price} onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {productId: itemData.item.id,productTitle:itemData.item.title})
        }}
        onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
        }} />}/>
    )
};

ProductsOverviewScreen.navigationOptions =navData => {
    return{
        headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
            <Item title='Cart' iconName={'md-cart'} onPress={() => {
                navData.navigation.navigate('Cart')
            }} />
        </HeaderButtons>
    }
   
}

export default ProductsOverviewScreen;