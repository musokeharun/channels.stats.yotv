import React, {Fragment, useEffect, useState} from "react";
import PageHeader from "../../layout/header/pageHeader";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, fetchEpg, fetchMain, selectMain, selectMeta, selectSelectedRange} from "./funnelSlice";
import {DateTime} from "luxon";
import Area from "../../common/charts/Area";
import CountUp from "react-countup";
import classNames from "classnames";
import MostDay from "./mostDay";
import MostHour from "./MostHour";
import _ from "lodash";

export default function Funnel() {
    const dispatch = useDispatch()
    const dateTime = DateTime.now();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const main = useSelector(selectMain);
    const meta = useSelector(selectMeta);
    let dateSelected = useSelector(selectSelectedRange);

    console.log("Date Selected", dateSelected);

    const onDateRangeChangeListener = (startDate, endDate) => {
        setSelectedIndex(null);
        dispatch(
            fetchMain({
                from: startDate,
                to: endDate,
                type: "stream"
            }))

        dispatch(
            fetchEpg({
                time: startDate,
                // to: endDate.toMillis(),
            })
        )
        console.log("Dates", startDate, endDate);
    }

    useEffect(() => {
        onDateRangeChangeListener(dateTime.startOf("day").toMillis(), dateTime.endOf("day").toMillis())
    }, [])

    useEffect(() => {
        if (dateSelected && dateSelected.length > 1) {
            onDateRangeChangeListener(dateSelected[0], dateSelected[1]);
        }
    }, [dateSelected])

    function sumArrays(...arrays) {
        // console.log("Arrays", arrays);
        const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
        const result = Array.from({length: n});
        return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
    }

    const getMainDataFormatted = (main, selectedIndex) => {

        if (!main || !main.length) return {};

        let series = main.map((item) => {
            return {
                name: item.key,
                data: item.values.map(v => v.value)
            }
        })
        if (selectedIndex !== null) {
            series = [series[selectedIndex]];
        }
        const axis = main[0].values.map(v => v.key);

        let minIndex = 0;
        let maxIndex = 0;
        let minVar = 0
        let maxVar = 0
        let total = sumArrays.apply(null, [...series.map(serie => serie.data)]).reduce((acc, value, index) => {
            if (index === 0) {
                maxVar = value;
                minVar = value;
            }

            if (value > maxVar) {
                maxVar = value;
                maxIndex = index;
            }
            if (value < minVar) {
                minVar = value;
                minIndex = index;
            }
            return acc + value;
        }, 0)
        const maxValue = axis[maxIndex];
        const maxDate = DateTime.fromMillis(maxValue);

        console.log("Meta", meta);
        if (meta) {
            if (meta.days && meta.days > 2) {
                dispatch(fetchData({
                    from: maxDate.startOf("day").toMillis(),
                    to: maxDate.endOf("day").toMillis(),
                    interval: "1h"
                }, "mostDay"))
            }
            if (meta.hours && meta.hours > 2) {
                dispatch(fetchData({
                    from: maxDate.startOf("hour").toMillis(),
                    to: maxDate.endOf("hour").toMillis(),
                    interval: "1m",
                }, "mostHour"))
            }
        }
        return {
            series,
            axis,
            total,
            min: {key: axis[minIndex], value: minVar},
            max: {key: maxValue, value: maxVar}
        };
    }

    const getKeysFromMain = () => {
        if (!Array.isArray(main)) return [];
        return main.map(item => ({
            key: item.key,
            total: item.values.reduce((acc, {value}) => acc + value, 0)
        }));
    }

    let keysFromMain = getKeysFromMain();
    let total = keysFromMain.length && keysFromMain.reduce((a, e) => a + e.total, 0)

    // AS THE QUERY
    let data = getMainDataFormatted(main, selectedIndex);
    // DAILY

    console.log(selectedIndex, data, "Data", "Total", total);
    return (
        <Fragment>
            <PageHeader label={"Funnel Analysis"} withDate={true}/>

            <div className="row g-3 mb-3">
                <div className="col-12">
                    <div className="card overflow-hidden mb-3">
                        <div className="card-header">

                            <ul className="nav nav-tabs border-0 flex-nowrap" role="tablist">
                                <li className="nav-item me-2" role="presentation">
                                    <a onClick={() => setSelectedIndex(null)}
                                       className={classNames("nav-link mb-0  py-1 px-2", {active: selectedIndex === null})}>
                                        <div className="p-0 m-0">
                                            <h6 className="text-dark fs--2 text-nowrap m-0">All</h6>
                                            <h5 className="text-dark m-0">
                                                <CountUp
                                                    end={total}
                                                    separator=","/>
                                            </h5>
                                        </div>
                                    </a>
                                </li>
                                {
                                    !!keysFromMain.length && keysFromMain.map((key, index) => (
                                        <li className={classNames("nav-item me-2",)}
                                            role="presentation" key={index}>
                                            <a className={classNames("nav-link mb-0 py-1 px-2", {active: selectedIndex === index})}
                                               onClick={() => setSelectedIndex(index)}>
                                                <div className="p-0 m-0">
                                                    <h6 className="text-dark fs--2 text-nowrap m-0">{_.capitalize(key.key.toLowerCase())}</h6>
                                                    <h5 className="text-dark m-0">
                                                        <CountUp end={key.total} separator=","/>
                                                    </h5>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-xxl-3">
                                    <div className="row g-0 my-2">
                                        <div className="col-md-6 col-xxl-12 d-flex align-items-center">
                                            <div className="border-xxl-bottom border-xxl-200 mb-2">
                                                <p className="fs--2 text-500 fw-semi-bold my-0">
                                                    Total
                                                </p>
                                                <h2 className="text-primary">
                                                    <CountUp end={data.total || 0} separator={","}/>
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xxl-12 py-2">
                                            <div className="row mx-0">
                                                <div className="col-6 border-end border-bottom py-3">
                                                    <h5 className="fw-normal text-600">
                                                        {
                                                            data.max &&
                                                            DateTime.fromMillis(data.max.key).toFormat("ccc dd, t")
                                                        }
                                                    </h5>
                                                    <h6 className="text-500 mb-0">Most
                                                        <span className={"badge badge-soft-primary"}>
                                                            <CountUp end={!!data.max ? data.max.value : 0}
                                                                     separator={""}/>
                                                        </span>
                                                    </h6>
                                                </div>
                                                <div className="col-6 border-bottom py-3">
                                                    <h5 className="fw-normal text-600">
                                                        {
                                                            data.min &&
                                                            DateTime.fromMillis(data.min.key).toFormat("ccc dd, t")
                                                        }
                                                    </h5>
                                                    <h6 className="text-500 mb-0">Least
                                                        <span className={"badge badge-soft-warning"}>
                                                            <CountUp end={!!data.min ? data.min.value : 0}
                                                                     separator={""}/>
                                                        </span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-9" id="users" aria-labelledby="users-tab">
                                    <div style={{height: "15rem"}}>
                                        <Area data={data.series || []} axisData={data.axis || []}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"row g-3 mb-3"}>
                <div className={"col-md-6"}>

                    <h6 className={"px-2"}>Day with the most usage?</h6>
                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row flex-between-center g-card">
                                <div className="col-auto">
                                    <h6>Day</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pb-3">
                            <MostDay/>
                        </div>
                    </div>


                </div>
                <div className={"col-md-6"}>

                    <h6 className={"px-2"}>Hour with the most usage?</h6>
                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row flex-between-center g-card">
                                <div className="col-auto">
                                    <h6>Hour</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pb-3">
                            <MostHour/>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    );
}
