'use strict';

import cocTokenRefresher from 'coc-token-refresher';
let response = await cocTokenRefresher.getNewAPI("coc");
let cocApiToken = response.key;

function expectedTime(years = 0, days = 0, hours = 0, seconds = 0) {
    return {
        years,
        days,
        hours,
        seconds
    }
}
function sumTime() {
    let result = expectedTime();
    for (let i = 0; i < arguments.length; i++) {
        result.years += arguments[i].years,
            result.days += arguments[i].days,
            result.hours += arguments[i].hours,
            result.seconds += arguments[i].seconds
    }
    return result;
}
function formatTime(totalTime = 0, totalBuilders = 1) {
    let years = totalTime / (3600 * 24 * 365 * totalBuilders);
    let days = totalTime / (3600 * 24 * totalBuilders);
    let hours = totalTime / (3600 * totalBuilders);
    let seconds = totalTime / totalBuilders;
    return expectedTime(years, days, hours, seconds)
}
function maxTimeToBeTaken() {
    let max = expectedTime();
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].seconds > max.seconds) {
            max = arguments[i];
        }
    }
    return max;
}

export default { sumTime, formatTime, maxTimeToBeTaken, cocApiToken }