'use strict';

import cocApi from './index.js';
import rawData from './raw.json' assert {type: "json"};

const allUnits = arrayToJSON(rawData.RAW_UNITS);

function arrayToJSON() {
    //return user.troops.find((unit) => unit.name === troopName && unit.village === village);
    let result = {};
    for (let j = 0; j < arguments.length; j++) {
        for (let i = 0; i < arguments[j].length; i++) {
            result[arguments[j][i].name] = arguments[j][i];
        }
    }
    return result;
}
function troopUpgradeTimeToNextLevel(unitName, currentLevel, unitVillage) {
    let unit = allUnits[unitName];
    if (currentLevel == 0) {
        return unit.unlock.time;
    }
    try {
        return unit.upgrade.time[currentLevel - 2] ?? 0;
    } catch (e) {
        console.log("error troopUpgradeTimeToNextLevel:", arguments);
    }
}
function calculateTotalUpgradeTimeForUnit(unitName, unitVillage, unitLevel, unitMaxLevel) {
    let totalTime = 0; //seconds

    for (let currentLevel = unitLevel + 1; currentLevel <= unitMaxLevel; currentLevel++) {
        let time = troopUpgradeTimeToNextLevel(unitName, currentLevel, unitVillage)
        totalTime += time;
    }

    return totalTime;
}

export default {
    totalFinishTime: async (tag) => {
        let user = await cocApi.fetchUserObject(tag);

        let userUnits = arrayToJSON(user.troops, user.heroes, user.spells);

        let totalTime = {
            siege: 0,
            troops: 0,
            heroes: 0,
            spells: 0,
            pets: 0
        }
        //allUnits.forEach((unit, index, array)=>{
        Object.keys(allUnits).forEach(function (key) {
            let unit = allUnits[key]

            console.log('calculating total upgrade time for unit: ', unit.name);
            let userUnit;
            if (userUnits.hasOwnProperty(unit.name)) {
                userUnit = userUnits[unit.name];
            } else {
                userUnit = {
                    level: 0,
                    maxLevel: unit.levels[unit.levels.length - 1]
                }
            }
            if (userUnit.maxLevel <= userUnit.level) {
                console.log('Unit at max level: ', unit.name);
                return;
            }
            let unitUpgradeTime = calculateTotalUpgradeTimeForUnit(unit.name, unit.village, userUnit.level, userUnit.maxLevel);
            //category:troop,spell,hero
            //troop:subCategory:troop,siege,pet
            if (unit.subCategory == 'siege') {
                totalTime.siege += unitUpgradeTime;
            }
            else if (unit.subCategory == 'pet') {
                totalTime.pets += unitUpgradeTime;
            }
            else if (unit.category == 'troop') {
                totalTime.troops += unitUpgradeTime;
            }
            else if (unit.category == 'hero') {
                totalTime.heroes += unitUpgradeTime;
            }
            else if (unit.category == 'spell') {
                totalTime.spells += unitUpgradeTime;
            }
        });

        return totalTime;
    }
}