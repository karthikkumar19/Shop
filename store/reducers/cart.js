import {ADD_ORDER} from '../actions/orders';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items:{},
    totalAmount:0
};

export default (state= initialState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            const addedProduct = actions.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title

let updatedOrNewCartItem;

            if(state.items[addedProduct.id]){
                //already item is in the cart
                 updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
                return{
                    ...state,
                    items:{...state.items, [addedProduct.id]: updatedOrNewCartItem},
                        totalAmount: state.totalAmount + prodPrice
                        
                }

            }else{
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
                return{
                    ...state,
                    items:{...state.items, [addedProduct.id]: updatedOrNewCartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
                
            };
            case REMOVE_FROM_CART:
                const selectedCartItem = state.items[actions.pid];
                const currentQty = selectedCartItem.quantity;
                let updatedCartItems ;
                if(currentQty > 1){
                    //need to reduce it
                    const updatedCartItem = new CartItem(
                        selectedCartItem.quantity - 1,
                        selectedCartItem.productPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.productPrice
                    );
                    updatedCartItems = {...state.items, [actions.pid]: updatedCartItem}
                }else{
                     updatedCartItems = {... state.items};
                    delete updatedCartItems[actions.pid]
                }
                return{
                    ...state,
                    items: updatedCartItems,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
        case ADD_ORDER:
            return initialState;
    }          

    return state;
}