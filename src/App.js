import React, {Fragment, useEffect} from "react";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import "jquery/dist/jquery.min";
import "@popperjs/core/lib/popper";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/light.css";
import "./user.css"

import Sidebar from "./layout/sidebar";
import TopBar from "./layout/topbar";
import Footer from "./layout/footer";
import Settings from "./pages/settings";
import AdminLogin from "./modules/admin/login";
import PartnerLogin from "./modules/partner/auth/login";
import OverView from "./modules/partner/overview/overView";
import "sweetalert2/dist/sweetalert2.min.css";
import {getCurrentUser} from "./services/user";
import Funnel from "./pages/funnel/funnel";
import {initDropDown} from "./utils/utils";

function App() {
    const user = getCurrentUser();
    console.log("User", user)

    useEffect(() => {
        initDropDown();
    }, [])

    return (
        <HashRouter>
            <Switch>
                <Route path={"/admin/login"} render={props => <AdminLogin {...props}/>}/>
                <Route path={"/partner/login"} render={props => <PartnerLogin {...props}/>}/>
                <Route path={"/"} render={props => {
                    if (!user) return <Redirect to={"/partner/login"} {...props}/>
                    return (
                        <Fragment>
                            <Sidebar/>
                            <div className="main scrollbar overflow-auto" style={{maxHeight: "100vh"}}>
                                <TopBar/>
                                <main className="content ">
                                    <div className="container-fluid p-0">
                                        <Switch>
                                            <Route path={"/settings"} exact render={props => <Settings {...props} />}/>
                                            <Route path={"/partner/funnel"} exact
                                                   render={props => <Funnel {...props} />}/>
                                            <Route path={"/partner/overview"}
                                                   render={props => <OverView {...props} />}/>
                                            <Redirect to={"/partner/overview"}/>
                                        </Switch>
                                    </div>
                                </main>
                                <Footer/>
                            </div>
                        </Fragment>
                    );
                }}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
