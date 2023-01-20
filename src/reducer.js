const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [], total: 0, amount: 0 };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'CHANGE_AMOUNT':
      let tempCart2 = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount:
                action.payload.type === 'increase'
                  ? item.amount + 1
                  : item.amount - 1,
            };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: tempCart2,
      };

    case 'GET_TOTALS':
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          cartTotal.amount += amount;
          cartTotal.total += price * amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case 'LOADING':
      return { ...state, loading: true };
    case 'DISPLAY_ITEMS':
      return { ...state, loading: false, cart: action.payload };
    default:
      throw new Error('no mathing action type');
  }
};
export default reducer;
