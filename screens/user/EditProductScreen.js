import React,{useState,useCallback,useEffect,useReducer} from 'react';
import {View,StyleSheet, Text, ScrollView, TextInput, Alert} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';

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
    
    const textChangeHandler = (inputIdentifier,text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true
        }
        dispatchFormState({type: FORM_INPUT_UPDATE, value: text , isValid:isValid,
        input:inputIdentifier})
    }

    return (
        <ScrollView>
            <View style={styles.form}>
            <View style={styles.formcontrol}>
           <Text style={styles.label}>Title</Text>
           <TextInput style={styles.input} value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this,'title')}
            keyboardType='default' 
            autoCapitalize='sentences'
            returnKeyType='next' />
           </View>
           {!formState.inputValidaties.title && <Text>Please enter Valid type</Text>}
           <View style={styles.formcontrol}>
           <Text style={styles.label}>Image Url</Text>
           <TextInput style={styles.input}  value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this,'imageUrl')} />
           </View>
         {editedProduct ? null :   <View style={styles.formcontrol}>
           <Text style={styles.label}>Price</Text>
           <TextInput style={styles.input} 
            value={formState.inputValues.price}
            onChangeText={textChangeHandler.bind(this,'price')}
            keyboardType='decimal-pad'/>
           </View>
        }
           <View style={styles.formcontrol}>
           <Text style={styles.label}>Description</Text>
           <TextInput style={styles.input}  value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this,'description')} />
           </View>
            </View>
           
        </ScrollView>
      
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
    formcontrol:{
        width:'100%'
    },
    label:{
        marginVertical:8
    },
    input:{
        paddingHorizontal:5,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }
})

export default EditProductScreen
