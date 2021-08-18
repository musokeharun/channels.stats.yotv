import React, {Fragment} from 'react';

const Footer = () => {
    return (
        <Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row text-muted">
                        <div className="col-6 text-start">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a className="text-muted" target={"_blank"}
                                       href="mailto:support@yotvchannels.com">Support</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Help Center</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Privacy</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 text-end">
                            <p className="mb-0">
                                {new Date().getFullYear()} -
                                <a className="text-muted" target={"_blank"}
                                   href={"https://yotvchannels.com"}>YOTVChannels</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;