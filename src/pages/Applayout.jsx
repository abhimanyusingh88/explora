// import AppNav from "../Components/AppNav";

import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";
import styles from "./Applayout.module.css"
import User from "../Components/User";
// import { Outlet } from "react-router-dom";

function Applayout()
{
    return <div className={styles.app}>
        {/* <AppNav/>
        <p>AppLayout</p> */}
        <Sidebar/>
        <Map/>
        <User/>
    

    </div>
} export default Applayout;