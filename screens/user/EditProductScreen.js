import React,{useState,useCallback,useEffect,useReducer} from 'react';
import {View,StyleSheet, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input] : action.value
        };
        const updatedValidities = {
            ...state.inputValidaties,
            [action.input] : action.isValid
        };
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid:updatedFormIsValid,
            inputValues:updatedValues,
            inputValidaties:updatedValidities
        }
    }
    return state
}


const EditProductScreen = props => {
    const proId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === proId));

const [formState, dispatchFormState] =  useReducer(formReducer, {
    inputValues:{
        title: editedProduct ? editedProduct.title : '',
        imageUrl : editedProduct ? editedProduct.imageUrl : '',
        price:  '',
        description:editedProduct ? editedProduct.description : ''
    },
    inputValidaties:{
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false,

    },
    formIsValid:editedProduct ? true : false
})

   

    // const [title,setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [imageUrl,setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price,setPrice] = useState(editedProduct ? editedProduct.price : '');
    // const [description,setDescription] = useState(editedProduct ? editedProduct.description : '');

const dispatch= useDispatch();


    const submitHandler = useCallback(() => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input!', 'Please Check the errors in the form.',[
                {text:'Okay'}
            ]);
            return
        }
        if(editedProduct){
            dispatch(productsActions.updateProduct(proId,formState.inputValues.title,formState.inputValues.description,
                formState.inputValues.imageUrl));
        }else{
            dispatch(productsActions.createProduct(formState.inputValues.title,
                formState.inputValues.description,formState.inputValues.imageUrl, 
                +formState.inputValues.price))
        }
        props.navigation.goBack();
    },[dispatch,formState])

    useEffect(() => {
        console.log(formState.inputValues)
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])
    
    const inputChangeHandler = useCallback((inputIdentifier,inputValue, inputValidity) => {
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue , isValid:inputValidity,
        input:inputIdentifier});
    },[dispatchFormState])

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
 <ScrollView>
            <View style={styles.form}>
           <Input
           id='title'
           label='Title'
           errorText="Please enter a valid Title"
           keyboardType='default'
           autoCaptalize="sentences"
           autoCorrect
           returnKeyType="next"
           onInputChange={inputChangeHandler}
           initialValue={editedProduct? editedProduct.title : ''}
           initiallyValid={!!editedProduct}
           required
           />
         <Input
         id='imageUrl'
           label='Image URL'
           errorText="Please enter a valid Image URL"
           keyboardType='default'
           autoCorrect
           returnKeyType="next"
           onInputChange={inputChangeHandler}
           initialValue={editedProduct? editedProduct.imageUrl : ''}
           initiallyValid={!!editedProduct}
           required
           />
                    <Input
                    id='price'
           label='Price'
           errorText="Please enter a valid Price"
           keyboardType='decimal-pad'
           returnKeyType="next"
           onInputChange={inputChangeHandler}
           required
           min={0.1}
           />
        
        <Input
        id='description'
           label='Description'
           errorText="Please enter a valid Description"
           keyboardType='default'
           autoCaptalize="sentences"
           autoCorrect
           multiline
           numberOfLines={3}
           onInputChange={inputChangeHandler}
           initialValue={editedProduct? editedProduct.description : ''}
           initiallyValid={!!editedProduct}
           required
           minLength={5}
           />
            </View>
           
        </ScrollView>
        </KeyboardAvoidingView>
       
      
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={Headerbutton}>
    <Item title='Save' iconName={'md-checkmark'} onPress={submitFn} />
</HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },
   
})

export default EditProductScreen
