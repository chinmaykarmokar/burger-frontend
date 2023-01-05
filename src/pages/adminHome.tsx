import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const AdminHome: React.FC = () => {
    const router = useRouter();

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    },[])

    if (typeof window !== "undefined") {
        setTimeout(() => {
            localStorage.clear();
            router.push("/adminLogin");
            console.log(localStorage.getItem("access_token"));
        }, 60000)
    }

    return (
        (hydrated && typeof window !== "undefined" && localStorage.getItem("access_token")) ? 
            <>
                <h1>Hello Admin, welcome back!</h1>
            </>
        :
            <>
                <h1>You are not authorized...</h1>
            </>
    )
}

export default AdminHome;