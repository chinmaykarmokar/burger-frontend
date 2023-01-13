import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getCustomer } from "../state/actions/customerActions";
import { getCompleteMenu } from "../state/actions/customerActions";
import { getCartItems } from "../state/actions/customerActions";

export const getCustomerDetails = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/allCustomers", configParams)
    .then((response) => {
        dispatch(getCustomer(response?.data?.data));
    }) 
}

export const getMenuItems = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/menu", configParams)
    .then((response) => {
        dispatch(getCompleteMenu(response?.data?.data));
    }) 
}

export const getItemsFromCart = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/getCartItems", configParams)
    .then((response) => {
        dispatch(getCartItems(response?.data?.data));
    })
}