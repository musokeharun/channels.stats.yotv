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
import $ from "jquery";

const OverView = ({location}) => {
    let user = getCurrentUser();
    let dispatch = useDispatch();
    let realtime = useSelector(selectRealtime);
    let dashboard = useSelector(selectDashboard);

    console.log("Dash", dashboard);

    useEffect(() => {
        dispatch(fetchRealtime())
        dispatch(fetchDashBoard())

        let interval = setInterval(() => {
            if (location.pathname !== "/partner/overview") return;
            dispatch(fetchRealtime())
            dispatch(fetchDashBoard())
            if (!$(".sidebar").hasClass("collapsed"))
                sideBarToggle();
        }, 90000);

        return () => {
            clearInterval(interval);
        }

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


    return (
        <Fragment>

            <PageHeader label={"DashBoard"}/>

            <div className="row h-100">
                {/*WELCOME BACK*/}
                <div className="col-12 col-sm-6 col-xxl-3 d-flex">
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
                <div className="col-12 col-sm-6 col-xxl-3 d-flex">
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
                <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body py-4">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                    <h1 className="mb-3 display-3">{!live ||
                                    <CountUp end={live || 0} separator=","/>}</h1>
                                    <p className="mb-2">Live Streaming users</p>
                                    <div className="mb-0">
                                        <span className="badge badge-soft-success me-2"> <i
                                            className="mdi mdi-arrow-bottom-right"/> +0.00% </span>
                                        <span className="text-muted">Since last sync</span>
                                    </div>
                                </div>
                                <div className="d-inline-block ms-3">
                                    <div className="stat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-shopping-bag align-middle text-danger">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                            <line x1="3" y1="6" x2="21" y2="6"/>
                                            <path d="M16 10a4 4 0 0 1-8 0"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                    <div className="card flex-fill">
                        <div className="card-body py-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h1 className="mb-3 display-4">
                                        {!allTotal ||
                                        <CountUp end={allTotal || 0} separator=","/>}
                                    </h1>
                                    <p className="mb-2">Total Engaging users.</p>
                                    <div className="mb-0">
                                        <span className="badge badge-soft-success me-2"> <i
                                            className="mdi mdi-arrow-bottom-right"/> +0.00% </span>
                                        <span className="text-muted">Since last sync</span>
                                    </div>
                                </div>
                                <div className="d-inline-block ms-3">
                                    <div className="stat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-dollar-sign align-middle text-success">
                                            <line x1="12" y1="1" x2="12" y2="23"/>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"row"}>

                <div style={{
                    minHeight: "60vh",
                    height: "60vh"
                }} className={classNames("col col-xxl-8 col-lg-6 my-md-1 my-2", {"shine": !okay})}>
                    <div className="card flex-fill w-100 bg-primary-dark">
                        <div className="card-header bg-transparent light">
                            <h6 className="text-white">Users online right now</h6>
                            <div className="real-time-user display-3 fw-normal text-white">
                                {!!live && <CountUp end={live || 0} separator=","/>}
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
                <div style={{
                    minHeight: "55vh",
                    height: "55vh"
                }} className={"col-lg-6 col-xxl-4 d-flex my-md-1 my-2"}>

                    <div className={"card flex-fill h-100"}>

                        <div className="card-header d-flex flex-between-center bg-light">
                            <h6 className="mb-0">Other Channels</h6>
                        </div>

                        <div className="card-body d-flex flex-column justify-content-between py-0">
                            <div className="my-auto">
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
                <div className="col-lg-7 col-xxl-8 d-flex my-md-1 my-2">
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
                <div className={"col-lg-5 col-xxl-4 d-flex my-md-1 my-2"}>
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