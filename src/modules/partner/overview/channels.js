import React, {Fragment} from 'react';

const Channels = () => {
    return (
        <Fragment>
            <div className="border-top">
                <table className="table table-sm mb-0">
                    <tbody>
                    <tr>
                        <td className="py-3">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://prium.github.io/falcon/v3.2.0/assets/img/icons/chrome-logo.png"
                                    alt="" width="16"/>
                                <h6 className="text-600 mb-0 ms-2">Spark</h6>
                            </div>
                        </td>
                        <td className="py-3">
                            <div className="d-flex align-items-center"><span
                                className="fas fa-circle fs--2 me-2 text-primary"/>
                                <h6 className="fw-normal text-700 mb-0">50.3%</h6>
                            </div>
                        </td>
                        <td className="py-3">
                            <div className="d-flex align-items-center justify-content-end"><span
                                className="fas fa-caret-down text-danger"/>
                                <h6 className="fs--2 mb-0 ms-2 text-700">2.9%</h6>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://prium.github.io/falcon/v3.2.0/assets/img/icons/chrome-logo.png"
                                    alt="" width="16"/>
                                <h6 className="text-600 mb-0 ms-2">Spark</h6>
                            </div>
                        </td>
                        <td className="py-3">
                            <div className="d-flex align-items-center"><span
                                className="fas fa-circle fs--2 me-2 text-primary"/>
                                <h6 className="fw-normal text-700 mb-0">50.3%</h6>
                            </div>
                        </td>
                        <td className="py-3">
                            <div className="d-flex align-items-center justify-content-end"><span
                                className="fas fa-caret-down text-danger"/>
                                <h6 className="fs--2 mb-0 ms-2 text-700">2.9%</h6>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default Channels;