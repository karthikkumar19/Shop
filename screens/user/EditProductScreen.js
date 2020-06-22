import React,{useState,useCallback,useEffect} from 'react';
import {View,StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import Headerbutton from '../../components/UI/Headerbutton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {

    const proId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === proId));

    const [title,setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl,setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price,setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description,setDescription] = useState(editedProduct ? editedProduct.description : '');

const dispatch= useDispatch();

    const submitHandler = useCallback(() => {
        if(editedProduct){
            dispatch(productsActions.updateProduct(proId,title,description,imageUrl));
        }else{
            dispatch(productsActions.createProduct(title,description,imageUrl, +price))
        }
    },[dispatch,price,title,description,proId,imageUrl])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])
    

    return (
        <ScrollView>
            <View style={styles.form}>
            <View style={styles.formcontrol}>
           <Text style={styles.label}>Title</Text>
           <TextInput style={styles.input} value={title}
            onChangeText={text => setTitle(text)} />
           </View>
           <View style={styles.formcontrol}>
           <Text style={styles.label}>Image Url</Text>
           <TextInput style={styles.input}  value={imageUrl}
            onChangeText={text => setImageUrl(text)} />
           </View>
         {editedProduct ? null :   <View style={styles.formcontrol}>
           <Text style={styles.label}>Price</Text>
           <TextInput style={styles.input} 
            value={price}
            onChangeText={text => setPrice(text)}/>
           </View>
        }
           <View style={styles.formcontrol}>
           <Text style={styles.label}>Description</Text>
           <TextInput style={styles.input}  value={description}
            onChangeText={text => setDescription(text)} />
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
