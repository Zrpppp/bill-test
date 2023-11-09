import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getBillList} from "@/store/modules/billStore";

const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getBillList()) },[dispatch])
    return (
        <div>
            <Outlet/>
            我是 Layout
        </div>
    )
}

export default Layout;
