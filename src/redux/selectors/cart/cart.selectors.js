import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectHiddenCart = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQantity, cartItem) =>
                accumalatedQantity + cartItem.quantity,
            0
        )
);

export const selecCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQantity, cartItem) =>
                accumalatedQantity + cartItem.quantity * cartItem.price,
            0
        )
);
