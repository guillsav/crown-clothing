import { cartActionTypes } from '../../actions';

export const toggleHiddenCart = () => ({
    type: cartActionTypes.TOGGLE_HIDDEN_CART
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItem = item => ({
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});
