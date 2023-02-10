import React , {useState} from "react";
import ManageCases from "../components/ManageCases";
import ManageOrg from "../components/ManageOrg";
import ManageUser from "../components/ManageUser";
import './AdminPage.css';


const AdminPage = () => {

    const [manageUsers , setManageUsers] = useState(true);
    const [manageCases , setManageCases] = useState(false);
    const [manageOrg , setManageOrg] = useState(false);

    const handleShown =  ( show ) => {
        
        if (show === "users") {

            setManageUsers(true);
            setManageCases(false);
            setManageOrg(false);
        }
        
        if (show === "cases") {

            setManageUsers(false);
            setManageCases(true);
            setManageOrg(false);
        }
        
        if (show === "organizations") {

            setManageUsers(false);
            setManageCases(false);
            setManageOrg(true);
        }
    }  

    return (
        <div className="adminPage" >

            <div className="d-flex-c f-sv f-wrap text-center">

                    <div className="single_admin_utlity" onClick={() => handleShown('users') } >
                        <img src="/images/admin/programmer.png" alt="users" />
                        <h1 className="mt-1 main_headline_sm">Manage Users</h1>
                    </div>

                    <div className="single_admin_utlity" onClick={() => handleShown('cases') } >
                        <img src="/images/admin/case-study.png" alt="cases" />
                        <h1 className="mt-1 main_headline_sm">Manage Cases</h1>
                    </div>

                    <div className="single_admin_utlity" onClick={() => handleShown('organizations') } >
                        <img src="/images/admin/building.png" alt="organizations" />
                        <h1 className="mt-1 main_headline_sm">Manage Orginzations</h1>
                    </div>

            </div>

        {manageUsers && (
           <ManageUser />
        )}

        {manageCases && (
           <ManageCases />
        )}

        {manageOrg && (
           <ManageOrg />
        )}


        </div>
    );



}

export default AdminPage;