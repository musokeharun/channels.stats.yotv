import React, {useState, useEffect} from 'react';
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/dark.css";
import {DateTime} from "luxon";
import {createToast} from "../utils/toasts";

let toast = createToast();

const TimePicker = ({handleRangeChange, onCancel}) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const actions = [
        ["Last 5 minutes", now => now.minus({minutes: 5}), now => now],
        ["Last 15 minutes", now => now.minus({minutes: 15}), now => now],
        ["Last 30 minutes", now => now.minus({minutes: 30}), now => now],
        ["Last 1 hour", now => now.minus({hours: 1}), now => now],
        ["Last 3 hours", now => now.minus({hours: 3}), now => now],
        ["Last 6 hours", now => now.minus({hours: 6}), now => now],
        ["Last 12 hours", now => now.minus({hours: 12}), now => now],
        ["Yesterday", now => now.minus({days: 1}).startOf("day"), now => now.minus({days: 1}).endOf("day")],
        ["Last 2 days", now => now.minus({days: 2}).startOf("day"), now => now.minus({days: 1}).endOf("day")],
        ["Last week", now => now.minus({weeks: 1}).startOf("week"), now => now.minus({weeks: 1}).endOf("day")],
        ["Last 2 weeks", now => now.minus({weeks: 2}).startOf("week"), now => now.minus({weeks: 1}).endOf("week")],
        ["Last month", now => now.minus({months: 1}).startOf("month"), now => now.minus({months: 1}).endOf("month")],
        ["Last 2 months", now => now.minus({months: 2}).startOf("month"), now => now.minus({months: 1}).endOf("month")],
        ["Today", now => now.startOf("day"), now => now.endOf("day")],
        ["Today so far", now => now.startOf("day"), now => now],
        ["This week", now => now.startOf("week"), now => now.endOf("week")],
        ["This week so far", now => now.startOf("week"), now => now],
        ["This month", now => now.startOf("month"), now => now.endOf("month")],
        ["This month so far", now => now.startOf("month"), now => now],
        ["This year", now => now.startOf("year"), now => now.endOf("year")],
        ["This year so far", now => now.startOf("year"), now => now],
    ];
    const current = DateTime.now();

    useEffect(() => {
        return () => {
            console.log(typeof start, typeof end, "Dates");
        };
    }, [start, end]);

    const handleApply = () => {
        if (!start || !end) return;

        if (start.getTime() >= end.getTime()) {
            toast.fire({
                title: "Start Date is greater than End Date",
                icon: "warning"
            }).then(console.log)
            return;
        }
        console.log("Applying");
        handleRangeChange && handleRangeChange(start, end);
    }

    return (
        <div className={"row min-vw-100"}>
            <h1 className={"text-center"}>{`Start ${start || "No start date"} : End ${end || "No End date"}`}</h1>
            <div className={"col-md-6 mx-auto p-2"}>
                <div className={"row"}>


                    <div className={"col-7"}>
                        <h6>Absolute time range</h6>
                        <div className={"form-group mb-3"}>
                            <label className={"d-block"}>From</label>
                            <Flatpickr
                                data-enable-time
                                value={start}
                                onChange={([date]) => {
                                    setStart(date);
                                }}
                                maxDate={end}
                            />
                        </div>

                        <div className={"form-group"}>
                            <label className={"d-block"}>To</label>
                            <Flatpickr
                                data-enable-time
                                value={end}
                                onChange={([date]) => {
                                    setEnd(date);
                                }}
                                minDate={start}
                            />
                        </div>
                        <div className={"w-100 d-flex justify-content-center align-items-center my-3"}>
                            <button className="btn btn-outline-warning w-25 mr-5 me-5" onClick={e => {
                                onCancel && onCancel();
                            }}>Cancel
                            </button>
                            <button className="btn btn-outline-primary w-25" onClick={handleApply}>Apply</button>
                        </div>
                    </div>
                    <div className={"col-5 scrollbar h-100"}>
                        <h6>Relative time range</h6>
                        {
                            actions && actions.map(([label, startFn, endFn], index) => {
                                const handleClick = () => {
                                    setStart(startFn(current).toJSDate())
                                    setEnd(endFn(current).toJSDate())
                                }
                                return <TimeButton label={label} key={index} handleOnClick={handleClick}/>
                            })
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};


const TimeButton = ({label, handleOnClick}) => {
    return <button className="btn btn-outline-primary d-block mb-2" onClick={e => handleOnClick()}>{label}</button>
}

export default TimePicker;