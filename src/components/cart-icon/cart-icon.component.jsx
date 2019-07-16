import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { toggleHiddenCart } from '../../redux/actions';
import { selectCartItemsCount } from '../../redux/selectors/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleHiddenCart, itemCount }) => (
    <div className="cart-icon" onClick={toggleHiddenCart}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleHiddenCart: () => dispatch(toggleHiddenCart())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);
