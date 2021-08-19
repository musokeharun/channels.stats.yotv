import React, {Fragment, useEffect, useRef, useState} from 'react';
import TimePicker from "../../common/TimePicker";
import {selectSelectedRange, setDates} from "../../pages/funnel/funnelSlice";
import {Dropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const PageHeader = ({label, withDate = false}) => {
    const dates = useSelector(selectSelectedRange);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const handleTimePickerResult = (start, end) => {
        console.log("Reaching");
        dispatch(setDates([start.getTime(), end.getTime()]))
    }


    if (!label) return <Fragment/>
    return (
        <div className="row mb-2 mb-xl-3">
            <div className="col-auto d-none d-sm-block  ">
                <h3>{label}</h3>
            </div>

            {
                !!withDate &&
                <div className="col-auto mx-auto">
                    <Dropdown autoClose={"outside"} align={"start"}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Date Range {!!dates.length && dates.map(d => !!d && new Date(d).toLocaleString())}
                        </Dropdown.Toggle>
                        <Dropdown.Menu align={"start"} className={"dropdown-menu-start"}>
                            <div className={"card card-body p-0"} style={{
                                minWidth: "35vw",
                                maxWidth: "35vw",
                                minHeight: "30vh",
                                maxHeight: "30vh"
                            }}>
                                <TimePicker handleRangeChange={(e, f) => handleTimePickerResult(e, f)}/>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }
        </div>
    );
};

export default PageHeader;