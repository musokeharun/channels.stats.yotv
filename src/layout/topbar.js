import React, {useState} from 'react';
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faSearch, faUserCog} from "@fortawesome/free-solid-svg-icons";

import Input from "../common/input";
import logo from "../assets/avatar.png";
import Messages from "./header/messages";
import Alerts from "./header/alerts";
import {Link} from "react-router-dom";
import {getCurrentUser, logout} from "../services/user";
import {Dropdown} from "react-bootstrap";

const Topbar = () => {

    const [search, setSearch] = useState("");
    const user = getCurrentUser();

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg z-6 shadow-lg bg-yotv-dark">
            <a className="sidebar-toggle" onClick={e => {
                e.preventDefault();
                sideBarToggle();
            }}>
                <i className="hamburger align-self-center"/>
            </a>


            {/*SEARCH*/}
            <form className="d-none d-sm-inline-block">
                <div className="input-group input-group-navbar">
                    <Input name={"search"} onChange={e => setSearch(e.currentTarget.value)}
                           placeholder={"Search Console"} type={"text"} value={search}/>
                    <button className="btn" type="button">
                        <FontAwesomeIcon icon={faSearch} className={"align-middle"}/>
                    </button>
                </div>
            </form>

            {/*RIGHT SECTION*/}
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align d-flex align-items-center">

                    <li className="nav-item dropdown">
                        <Messages/>
                    </li>

                    <li className="nav-item dropdown">
                        <Alerts/>
                    </li>


                    <li className="nav-item">
                        <Dropdown align={"start"}>
                            <Dropdown.Toggle className={"bg-yotv-dark"} variant="light" id="dropdown-basic">
                                <span className="text-white fw-bolder">{user.name}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align={"start"}>
                                <Link to={"/settings"} className="dropdown-item">
                                    <FontAwesomeIcon icon={faUserCog} className={"align-middle me-1"}/>
                                    Profile
                                </Link>
                                <Link to={"/admin/overview"} className="dropdown-item">
                                    <FontAwesomeIcon icon={faChartPie} className={"align-middle me-1"}/>
                                    Analytics
                                </Link>
                                <div className="dropdown-divider"/>
                                <Link className="dropdown-item" to={"/settings"}>
                                    Settings & Privacy
                                </Link>
                                <a className="dropdown-item" href="#">Help</a>
                                <a className="dropdown-item" href="#" onClick={e => {
                                    e.preventDefault();
                                    logout();
                                    window.location.reload();
                                }}>Sign out</a>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>

                    <li className={"nav-item"}>
                        <img
                            src={"https://mw.channels256.com/" + user.img || logo}
                            className="avatar img-fluid rounded-circle me-1"
                            alt={user.img || "YoTvChannels"}
                        />
                    </li>


                </ul>
            </div>

        </nav>
    );
};

export const sideBarToggle = () => {
    $(".sidebar").toggleClass("collapsed").on("transitionend", function () {
        console.log("Resize done")
        window.dispatchEvent(new Event("resize"));
    });
}
export default Topbar;