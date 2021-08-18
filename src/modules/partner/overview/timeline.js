import React from 'react';
import {DateTime} from "luxon";

const Timeline = ({isFinished, lastSecond, updated}) => {
    console.log(isFinished, "Last Second", lastSecond, updated)

    let lastUpdateDate = DateTime.fromISO(updated, {setZone: true, zone: "utc"});
    let diffSoFar = lastUpdateDate.diff(DateTime.now().plus({hours: 3}), ["hours", "minutes", "seconds"]).toObject();
    let {hours, minutes, seconds} = diffSoFar;
    console.log(diffSoFar);

    let status = "";
    let button = "";
    if (hours === 0 && minutes <= 3) {
        status = "ONLINE";
        button = "success";
    } else if (hours === 0 && minutes > 3 && minutes <= 8) {
        status = "JUST LEFT";
        button = "warning";
    } else {
        status = "OFFLINE";
        button = "danger";
    }

    if (isFinished) {
        button = "success"
        status = "Completed"
    }

    return (
        <div className="d-flex align-items-center position-relative mb-3"
             title={`Last Seen ${lastUpdateDate.toFormat("FFF")}`}>
            <div className="flex-1">
                <h6 className="mb-0 fw-semi-bold">
                    <a className={`btn btn-${button}`}>
                        {status}
                    </a>
                </h6>
                <p className="text-500 fs--2 mb-0">
                    {`Watched 
                    ${Math.abs(lastSecond / 3600).toFixed(0)} hours 
                    ${Math.abs((lastSecond % 3600) / 60).toFixed(0)} minutes
                    ${Math.abs((lastSecond % 3600) % 60).toFixed(0)} seconds.`}
                </p>
            </div>
        </div>
    );
};

export default Timeline;