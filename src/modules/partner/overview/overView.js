import React, {Fragment, useEffect} from 'react';
import PageHeader from "../../../layout/header/pageHeader";
import {useDispatch, useSelector} from "react-redux";
import welcome from "../../../assets/welcom.png";
import {faChartLine, faEllipsisH, faTv} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchDashBoard, fetchRealtime, selectDashboard, selectRealtime} from "./overviewSlice";
import classNames from "classnames";
import CountUp from "react-countup";
import RealtimeChart from "./realtimechart";
import {getCurrentUser} from "../../../services/user";
import {getCurrentEpg, getDataSourceStats} from "./overview-utils";
import DateTimeRadar from "./dateTimeRadar";
import TimelineChart from "./timelineChart";
import DateTimePieChart from "./dateTimePieChart";
import {sideBarToggle} from "../../../layout/topbar";

const OverView = () => {
    let user = getCurrentUser();
    let dispatch = useDispatch();
    let realtime = useSelector(selectRealtime);
    let dashboard = useSelector(selectDashboard);

    console.log("Dash", dashboard);

    useEffect(() => {
        dispatch(fetchRealtime())
        dispatch(fetchDashBoard())
    }, [])

    //EPG
    const {epg, dataSources} = realtime;
    let okay = false;

    let {start, end, duration, title, used, now} = getCurrentEpg(epg, okay);
    //console.log(start, end, duration, title, used, now);
    okay = !!title;

    let {result, totals, live, allTotal} = getDataSourceStats(dataSources);
    console.log("Totals", totals, "Live", live, "Result", result);

    let usedPercentage = Math.abs(used / duration) * 100;
    //console.log("Used", usedPercentage);

    const lastWeek = getDataSourceStats(dashboard['dataSourceLastWeek'], false);
    const yesterday = getDataSourceStats(dashboard['dataSourceYesterday'], false);
    const channelStats = getDataSourceStats(realtime['channelStats'], false);
    if (channelStats.totals) {
        let sort = channelStats.totals.sort((a, b) => b.value - a.value);
        console.log("Sorted", sort)
    }
    console.log("ChannelStats", channelStats);

    useEffect(() => {
        setTimeout(() => {
            sideBarToggle();
        }, 5000)
    }, [])

    return (
        <Fragment>

            <PageHeader label={"DashBoard"}/>

            <div className="row h-100">
                {/*WELCOME BACK*/}
                <div className="col-lg-6 col-xl-4 d-xl-flex d-none">
                    <div className="card illustration flex-fill">
                        <div className="card-body p-0 d-flex flex-fill">
                            <div className="row g-0 w-100">
                                <div className="col-6">
                                    <div className="illustration-text p-3 m-1">
                                        <h2 className="illustration-text">
                                            <span className={""}>Welcome</span> {(user.name.toLocaleUpperCase())}.
                                        </h2>
                                        <p className="mb-0 h3 ">
                                            <span className={"badge me-xl-2 badge-soft-info"}>
                                                YoTvChannels
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6 align-self-end text-end">
                                    <img
                                        src={welcome}
                                        alt="Welcome"
                                        className="img-fluid illustration-img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-4 d-flex">
                    <div className={classNames("card flex-fill", {"shine": !okay})}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h3 className="card-title font-weight-bold h3 text-dark" title={"Now Showing"}>
                                        {title ? title : ""}
                                    </h3>
                                </div>
                                <div className="col-auto" title={"Current Epg"}>
                                    <div className="stat stat-sm">
                                        <FontAwesomeIcon icon={faTv}/>
                                    </div>
                                </div>
                            </div>
                            <span className={"badge badge-soft-primary"}>Start</span>
                            <span className={"font-weight-bold"}>
                                {start ? start.toFormat("t") : ""}
                            </span>
                            <div className="progress my-lg-4 my-2">
                                {!!used &&
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated text-center"
                                    role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{width: `${usedPercentage}%`}}>
                                    {now ? now.toFormat("t") : ""}
                                </div>
                                }

                            </div>
                            <div className="mb-0 d-flex flex-row align-items-center justify-content-end">
                                <span className={"badge badge-soft-primary"}>End</span>
                                <span className={"font-weight-bold"}>
                                    {end ? end.toFormat("t") : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-4 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h3 className="card-title card-title font-weight-bold h3">Real-Time</h3>
                                </div>

                                <div className="col-auto">
                                    <div
                                        className="stat stat-sm d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faChartLine} className={"align-middle"}/>
                                    </div>
                                </div>
                            </div>
                            <span className="h1 d-inline-block mt-1 mb-4 text-dark">
                                {!live || <CountUp end={live} separator=","/>}
                            </span>
                            <span className="display-4 d-inline-block mt-1 mb-4 text-dark">
                                  &nbsp;/ {!allTotal || <CountUp end={allTotal} separator=","/>}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"row"}>

                <div className={classNames("col col-xxl-8 col-lg-6 h-100", {"shine": !okay})}>
                    <div className="card flex-fill w-100 bg-primary-dark">
                        <div className="card-header bg-transparent light">
                            <h6 className="text-white">Users online right now</h6>
                            <div className="real-time-user display-3 fw-normal text-white">
                                {!!live && <CountUp end={live} separator=","/>}
                            </div>
                        </div>
                        <div className="card-body text-white fs--1 light pb-2">
                            <p className="border-bottom"
                               style={{borderColor: "rgba(255, 255, 255, 0.15) !important"}}>Users per 5min</p>
                            <div style={{height: "9rem"}} className={"chart h-100 bg-transparent"}>
                                <RealtimeChart
                                    data={result && result.map(r => r.value)}
                                    axisData={result && result.map(r => r.key)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/*OTHER CHANNELS*/}
                <div className={"col-lg-6 col-xxl-4 d-flex h-100"}>

                    <div className={"card flex-fill pb-md-4"}>

                        <div className="card-header d-flex flex-between-center bg-light py-3">
                            <h6 className="mb-0">Other Channels</h6>
                        </div>

                        <div className="card-body d-flex flex-column justify-content-between py-0">
                            <div className="my-auto py-5 py-md-0">
                                <DateTimePieChart
                                    data={(!!channelStats && !!channelStats.totals && channelStats.totals.map(r => r.value)) || []}
                                    axisData={(!!channelStats && !!channelStats.totals && channelStats.totals.map(r => r.key)) || []}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className="row">
                <div className="col-lg-7 col-xxl-8 d-flex">
                    <div className="card flex-fill w-100">
                        <div className="card-header  bg-light py-2">
                            <div className="card-actions float-end">
                                <div className="dropdown show">
                                    <a
                                        href="#"
                                        data-bs-toggle="dropdown"
                                        data-bs-display="static"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisH} className={"align-middle"}/>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item text-primary" href="#">Live</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#"
                                        >Something else here</a
                                        >
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title mb-0">Yesterday</h5>
                        </div>
                        <div className="card-body d-flex w-100">
                            <div className="y-auto py-5 py-md-3 h-100 w-100 chart">
                                <TimelineChart
                                    data={(!!yesterday && !!yesterday.result && yesterday.result.map(r => r.value)) || []}
                                    axisData={(!!yesterday && !!yesterday.result && yesterday.result.map(r => r.key)) || []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-lg-5 col-xxl-4 d-flex"}>
                    <div className={"card flex-fill"}>

                        <div className="card-header d-flex flex-between-center bg-light py-2">
                            <h6 className="mb-0">Last Week</h6>
                        </div>

                        <div className="card-body d-flex flex-column justify-content-between py-0">
                            <div className="my-auto py-5 py-md-3 h-100">
                                <DateTimeRadar
                                    data={(!!lastWeek && !!lastWeek.result && lastWeek.result.map(r => r.value)) || []}
                                    axisData={(!!lastWeek && !!lastWeek.result && lastWeek.result.map(r => r.key)) || []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default OverView;