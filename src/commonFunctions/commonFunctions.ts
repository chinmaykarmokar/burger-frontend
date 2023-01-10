import React, { useState, useEffect } from "react";

// Import router
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import axios
import axios from "axios";

// Import actions
import { getCompleteMenu } from "../state/actions/customerActions";
// const dispatch = useDispatch();

export const getMenuItems = async (dispatch: any, configParams: Object) => {
    await axios.get("http://localhost:3000/api/customers/menu", configParams)
    .then((response) => {
        dispatch(getCompleteMenu(response?.data?.data));
    }) 
}