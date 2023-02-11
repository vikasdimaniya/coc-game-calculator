'use strict';

import predictor from './src/predictor.js';
import utils from './src/utils.js';

async function totalFinishTime(userTag) {
    try {
        if (typeof (userTag) == "string") {
            userTag = userTag
        } else {
            throw new Error("User tag must be a string in totalFinishTime.");
        }
        let totalTime = await predictor.totalFinishTime(userTag)
        let totalBuilders = 6;
        let buildings = utils.formatTime();
        let heroes = utils.formatTime(totalTime.heroes, totalBuilders);
        let siege = utils.formatTime(totalTime.siege);
        let troops = utils.formatTime(totalTime.troops, totalBuilders);//troops+spells
        let spells = utils.formatTime(totalTime.spells);
        let pets = utils.formatTime(totalTime.pets);
        let research = utils.sumTime(siege, troops, spells, pets);
        let petHouse = utils.sumTime(pets);
        let builder = utils.sumTime(buildings, heroes);
        let maxTime = utils.maxTimeToBeTaken(research, builder, petHouse);
        return {
            minTime: maxTime,
            overall: {
                research,
                builder,
                petHouse
            },
            categories: {
                heroes,
                siege,
                troops,
                spells,
                pets
            }

        };
    } catch (error) {
        throw error
    }
}

export default { totalFinishTime }