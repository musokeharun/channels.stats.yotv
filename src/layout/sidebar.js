import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBalanceScale, faChartPie, faCog, faFileContract,
    faFunnelDollar,
} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
    let darkerBackgroundColor = "#391C4F";
    let cogStyles = {
        backgroundColor: `${darkerBackgroundColor} !important`,
        position: "absolute",
        color: "white",
        top: "12px",
        right: "20px"
    };
    return (
        <nav id="sidebar" className="sidebar"
             style={{
                 backgroundColor: darkerBackgroundColor,
                 minHeight: "100vh",
                 maxHeight: "100vh",
                 overflowY: "hidden"
             }}>
            <div className="sidebar-content js-simplebar" style={{backgroundColor: darkerBackgroundColor}}>
                <a className="sidebar-brand">
                    <img src={logo} alt={"Yotv Console"}/>
                    <span className="align-middle ms-1">Console</span>
                </a>
            </div>

            <ul className="sidebar-nav scrollbar" style={{height: "60h", maxHeight: "60vh"}}>
                <li className="sidebar-item">
                    <span className="sidebar-link">
                        <FontAwesomeIcon icon={faChartPie} className={"align-middle"}/>
                        <NavLink to={"partner/overview"}
                                 className="align-middle fs-lg text-decoration-none text-white">Overview</NavLink>
                        <span style={cogStyles}>
                            <div className="dropend">
                              <span data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faCog} className={"fa-2x mx-auto"}/>
                              </span>
                              <ul className="dropdown-menu">
                                   <li><Link className="dropdown-item" to={"/settings"}>Settings</Link></li>
                                    <li><a className="dropdown-item" href="#">Users and Permissions</a></li>
                                    <li><a className="dropdown-item" href="#">Usage</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to={"/partner/login"}>Sign Out</Link></li>
                              </ul>
                            </div>
                        </span>
                    </span>
                </li>
                <li className="sidebar-header">Flows</li>
                <li className="sidebar-item">
                    <NavLink to={"/partner/funnel"} className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faFunnelDollar}/>
                        <span className="align-middle">Funnel Analysis</span>
                    </NavLink>
                </li>

                <li className="sidebar-header">Reports</li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faFileContract}/>
                        <span className="align-middle">Reports</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link">
                        <FontAwesomeIcon className={"align-middle"} icon={faBalanceScale}/>
                        <span className="align-middle">Comparison</span>
                    </a>
                </li>

            </ul>

            <div className="sidebar-cta align-baseline align-self-baseline">
                <div className="sidebar-cta-content" style={{backgroundColor: "#42205C"}}>
                    <strong className="d-inline-block mb-2">Monthly Sales Report</strong>
                    <div className="mb-3 text-sm">
                        Your monthly sales report is ready for download!
                    </div>

                    <div className="d-grid">
                        <a
                            href="https://themes.getbootstrap.com/product/appstack-responsive-admin-template/"
                            className="btn btn-primary"
                            target="_blank"
                        >Download</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;