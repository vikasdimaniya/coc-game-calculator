'use strict';

import got from "got";
import utils from './utils.js'

export default {
    fetchUserObject: async function (tag) {
        tag = tag.split("#")[1]; //coc api accepts only %23 insted of #
        try {
            const data = await got.get('https://api.clashofclans.com/v1/players/%23' + tag, {
                responseType: "json",
                headers: {
                    "Authorization": "Bearer " + utils.cocApiToken
                }
            });
            return data.body;
        } catch (err) {
            throw err;
        }
    }
};