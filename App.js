import React,{useState} from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

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
