import React, {Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBellSlash} from "@fortawesome/free-solid-svg-icons";

const Alerts = () => {
    return (
        <Fragment>
            <a
                className="nav-icon"
                id="alertsDropdown"
                data-bs-toggle="dropdown"
            >
                <div className="position-relative">
                    <FontAwesomeIcon icon={faBellSlash} className={"align-middle"}/>
                </div>
            </a>
            <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                aria-labelledby="alertsDropdown"
            >
                <div className="dropdown-menu-header">0 New Notifications</div>
                <div className="list-group">
                </div>
                <div className="dropdown-menu-footer">
                    <a href="#" className="text-muted">Show all notifications</a>
                </div>
            </div>
        </Fragment>
    );
};

export default Alerts;