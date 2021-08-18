import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {selectMostDay, selectMostHour} from "./funnelSlice";
import Bar from "../../common/charts/Bar";

const MostHour = () => {
    const mostHour = useSelector(selectMostHour) || [];

    if (!Array.isArray(mostHour) && !mostHour.length) return <Fragment/>;

    let series = mostHour.map((item, index) => {
        return {
            name: item.key,
            data: item.values.map(v => v.value)
        }
    })
    const axis = mostHour[0].values.map(v => v.key);
    console.log("Most Hour", mostHour, axis);

    return (
        <div style={{height: "15rem"}}>
            <Bar data={series} axisData={axis}/>
        </div>
    );
};

export default MostHour;