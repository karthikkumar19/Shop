import React,{useState} from 'react';
import { createStore, combineReducers ,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import OrdersReducer from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: OrdersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-reg': require('./assets/fonts/OpenSans-Regular.ttf'),
    'play-reg': require('./assets/fonts/Play-Regular.ttf')
  })
}

export default function App() {

const [fontLoaded,setFontLoaded] = useState(false)

if(!fontLoaded){
  return(
    <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true)
    }}/>
  )
}

  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
