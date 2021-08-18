import React, {Fragment} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";

const Messages = () => {
    return (
        <Fragment>
            <a
                className="nav-icon dropdown-toggle"
                id="messagesDropdown"
                data-bs-toggle="dropdown"
            >
                <div className="position-relative">
                    <FontAwesomeIcon icon={faCommentAlt} className={"align-middle"}/>
                    <span className="indicator">0</span>
                </div>
            </a>
            <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                aria-labelledby="messagesDropdown"
            >
                <div className="dropdown-menu-header">
                    <div className="position-relative">0 New Messages</div>
                </div>
                <div className="list-group">
                </div>
                <div className="dropdown-menu-footer">
                    <a href="#" className="text-muted">Show all messages</a>
                </div>
            </div>
        </Fragment>
    );
};

export default Messages;