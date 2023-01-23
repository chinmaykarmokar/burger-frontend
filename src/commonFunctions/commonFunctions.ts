import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getAdminDetails } from "../state/actions/adminActions";
import { getCustomer } from "../state/actions/customerActions";
import { getAllCustomers } from "../state/actions/adminActions";
import { getCompleteMenu } from "../state/actions/customerActions";
import { getCompleteMenuAdmin } from "../state/actions/adminActions";
import { getAllLiveOrders } from "../state/actions/adminActions";
import { getAllCompletedOrders } from "../state/actions/adminActions";
import { getCartItems } from "../state/actions/customerActions";
import { getUserWiseOrders } from "../state/actions/customerActions";
import { getAssignedOrders } from "../state/actions/deliveryPersonActions";
import { singleOrder } from "../state/actions/adminActions";

export const getAdminData = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/admin/adminDetails", configParams)
    .then((response) => {
        dispatch(getAdminDetails(response?.data?.data));
    })
}

export const getCustomerDetails = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/allCustomers", configParams)
    .then((response) => {
        dispatch(getCustomer(response?.data?.data));
    }) 
}

export const getAllCustomersDetails = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/admin/allCustomers", configParams)
    .then((response) => {
        dispatch(getAllCustomers(response?.data?.data));
    })
}

export const getAllLiveOrdersList = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/admin/getAllLiveOrders", configParams)
    .then((response: any) => {
        dispatch(getAllLiveOrders(response.data));
    })
}

export const fetchAllCompletedOrders = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/admin/getAllCompletedOrders", configParams)
    .then((response) => {
        dispatch(getAllCompletedOrders(response?.data));
    })
}

export const fetchCompleteMenuAdmin = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/admin/getCompleteMenu", configParams)
    .then((response) => {
        dispatch(getCompleteMenuAdmin(response?.data?.data));
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

export const getUserSpecificOrders = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/getMyOrders", configParams)
    .then((response) => {
        dispatch(getUserWiseOrders(response?.data?.data));
    })
}

export const fetchAssignedOrders = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/delivery/orderAssigned", configParams)
    .then((response) => {
        dispatch(getAssignedOrders(response?.data?.data));
    })
}