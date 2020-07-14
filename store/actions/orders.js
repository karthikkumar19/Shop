export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SER_ORDER';
import Order from '../../models/order';

export const fetchOrder = () => {
    return async dispatch => {
        try{
            const response = await fetch('https://shop-rn-5ba9d.firebaseio.com/orders/u1.json');
            if(!response.ok){
                throw new Error('something went Wrong!')
            }
            const resData = await response.json();
           const loadedOrders = [];
    
           for(const key in resData){
               loadedOrders.push(
                   new Order (
                       key,
                       resData[key].cartItems,
                       resData[key].totalAmount,
                       new Date(resData[key].date)
                   )
               );
           }
           dispatch({type:SET_ORDER, orders:loadedOrders})
        } catch (err) {
            // send custom
            throw err;
        }   
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        //any async code you want!
        const response = await fetch('https://shop-rn-5ba9d.firebaseio.com/orders/u1.json',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               cartItems,
               totalAmount,
               date: date.toISOString()
            })
        });
        if(!response.ok){
            throw new Error('something went wrong!')
        }
        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData:{
                id:resData.name,
                items:cartItems, amount:totalAmount, date:date
            }
        })
    }
   
}