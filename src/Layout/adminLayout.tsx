import React from "react";

// Import components
import AdminNavbarComponent from "../components/AdminNavbarComponent/adminNavbarComponent";
import Footer from "../components/FooterComponent/footerComponent";

const AdminLayoutComponent = ({user, children}: any) => {
    return (
        <>
            <AdminNavbarComponent loggedInPerson = {user}/>
                {children}
            <Footer/>
        </>
    )
}

export default AdminLayoutComponent;