import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {selectMostDay} from "./funnelSlice";
import Bar from "../../common/charts/Bar";

const MostDay = () => {
    const mostDay = useSelector(selectMostDay) || [];

    if (!Array.isArray(mostDay) && !mostDay.length) return <Fragment/>;

    let series = mostDay.map((item, index) => {
        return {
            name: item.key,
            data: item.values.map(v => v.value)
        }
    })
    const axis = mostDay[0].values.map(v => v.key);
    console.log("Most Day", mostDay, series, axis);

    return (
        <div style={{height: "15rem"}}>
            <Bar data={series} axisData={axis}/>
        </div>
    );
};

export default MostDay;