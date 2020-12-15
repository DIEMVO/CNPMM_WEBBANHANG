import Axios from "axios";
import { ORDER_CREATE_SUCCESS } from "../constants/orderConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL
} from "./../constants/orderConstants";
import { CART_EMPTY } from "./../constants/cartConstants";
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState(); // lay userInfo tu userSignin tu State
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems'); //Sau khi order thanh cong, xoa cartItems

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
