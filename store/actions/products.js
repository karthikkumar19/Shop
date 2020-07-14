import  Product from '../../models/Product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
    return async dispatch => {
        try{
            const response = await fetch('https://shop-rn-5ba9d.firebaseio.com/products.json');
            if(!response.ok){
                throw new Error('something went Wrong!')
            }
            const resData = await response.json();
           const loadedProducts = [];
    
           for(const key in resData){
               loadedProducts.push(
                   new Product(
                       key,
                       'u1',
                       resData[key].title,
                       resData[key].imageUrl,
                       resData[key].description,
                       resData[key].price
                   )
               );
           }
           dispatch({type:SET_PRODUCT, products:loadedProducts})
        } catch (err) {
            // send custom
            throw err;
        }     
    }
}

export const deleteProduct = productId => {
    return async dispatch => {

        await fetch(`https://shop-rn-5ba9d.firebaseio.com/products/${productId}.json`,{
             method:'DELETE',
         });
         if(!response.ok){
            throw new Error('something went wrong')
        }
         dispatch(
             {
        type: DELETE_PRODUCT,
        pid:productId
    }
         )
     }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        //any async code you want!
        const response = await fetch('https://shop-rn-5ba9d.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData = await response.json();

        console.log(resData);
        dispatch({
            type: CREATE_PRODUCT,
            productData:{
                id:resData.name,
                title,
                description,
                price,
                imageUrl
            }
        })
    }
  
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {

      const response = await fetch(`https://shop-rn-5ba9d.firebaseio.com/products/${id}.json`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });
      
        if(!response.ok){
            throw new Error('something went wrong')
        }

        dispatch(
            {
                type: UPDATE_PRODUCT,
                pid: id,
                productData:{
                    title,
                    description,
                    
                    imageUrl
                }
            }
        )
    }
    
};

