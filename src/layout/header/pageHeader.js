import React, {Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faFilter, faRoute} from "@fortawesome/free-solid-svg-icons";

const PageHeader = ({label}) => {
    if (!label) return <Fragment/>
    return (
        <div className="row mb-2 mb-xl-3">
            <div className="col-auto d-none d-sm-block">
                <h3>{label}</h3>
            </div>

            <div className="col-auto ms-auto text-end mt-n1">
                <div className="dropdown me-2 d-inline-block">
                    <a
                        className="btn btn-light bg-white text-black-50 shadow-sm dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                    >
                        <FontAwesomeIcon icon={faCalendar} className={"align-middle mt-n1"}/>
                        <span className={"mx-md-1"}>Today</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-end">
                        <h6 className="dropdown-header">Settings</h6>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"/>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </div>

                <button className="btn btn-primary shadow-sm me-md-1">
                    <FontAwesomeIcon icon={faFilter} className={"align-middle "}>
                        &nbsp;
                    </FontAwesomeIcon>
                </button>
                <button className="btn btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faRoute} className={"align-middle"}>
                        &nbsp;
                    </FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default PageHeader;