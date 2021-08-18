import {DateTime} from "luxon";
import DateDiff from "date-diff";

export const getDataSourceStats = (dataSources, hasLive = true, hasResult = true) => {

    if (!dataSources)
        return {};

    const arrays = [];
    let live = 0;

    let totals = dataSources.map(({key, values}) => {
        arrays.push(...values);
        let sum = values.reduce((a, c) => a + c.value, 0);
        if (key.toLowerCase().trim() !== "vod" && hasLive)
            live += sum;

        return {
            key,
            value: sum
        }
    })

    const result = hasResult && Object.values(arrays.reduce((acc, {key, value}) => {
        acc[key] = {key, value: (acc[key] ? acc[key].value : 0) + value};
        return acc;
    }, {}));

    const allTotal = totals.reduce((acc, rec) => acc + rec.value, 0);

    return {totals, result, live, allTotal};
}

export const getCurrentEpg = (epg) => {
    let okay = false;
    let epgCurrentVar;

    if (epg && Array.isArray(epg['current']) && epg["current"].length) {
        epgCurrentVar = epg['current'];
    } else {
        return {};
    }

    let currentEpg = {};

    let startDateTime = DateTime.fromISO(epgCurrentVar[0]['start'], {setZone: true, zone: "utc"});
    let now = DateTime.now().setZone("Africa/Kampala");
    let endDateTime = DateTime.fromISO(epgCurrentVar[0]['end'], {zone: "utc", setZone: true});

    console.log("Start", startDateTime.toSQL())
    console.log("Now", now.toSQL())
    console.log("End", endDateTime.toSQL())

    currentEpg['start'] = startDateTime;
    currentEpg['end'] = endDateTime;
    currentEpg['duration'] = epgCurrentVar[0]['duration'];
    currentEpg['title'] = epgCurrentVar[0]['title'];
    currentEpg['used'] = (new DateDiff(now.toJSDate(), startDateTime.minus({hours: 3}))).seconds();
    currentEpg['now'] = now;

    return currentEpg;
}
