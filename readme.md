GITHUB: https://github.com/vikasdimaniya/coc-game-calculator Don't forget to give a star to the project on GitHub

## What is this?

This is an module to calculate how long will it take for anyone to finish their game. This does not consider any time speeding items while calculations.

## Why?

People always wonder how long will it take for them to reach the max level or you can compare your results with your clan mates friends to see who is ahead.

## How to use it?
create account on [Clash of Clans](https://developer.clashofclans.com).   
you have to set environment variables for your email and password. Example:   
TERMINAL:   
```
//On Windows
set email="your@email.com"
set password="yourPassword"

//On MAC 
export email="your@email.com"
export password="yourPassword"
```

You can use this module by simply adding it to your project and pass user tag as string in totalFinishTime function. Example:   
```
'use strict';

import cocgc from 'coc-game-calculator';
import * as dotenv from 'dotenv'

dotenv.config()
async function a(){
    let ans = await cocgc.totalFinishTime("#8GGCUQGR9");
    console.log(ans);
}
a();
```

```
It will return a JSON object like this: 
```json
{
  minTime: {
    years: 2.7702054794520548,
    days: 1011.125,
    hours: 24267,
    seconds: 87361200
  },
  overall: {
    research: {
      years: 2.7702054794520548,
      days: 1011.125,
      hours: 24267,
      seconds: 87361200
    },
    builder: {
      years: 0.2699771689497717,
      days: 98.54166666666667,
      hours: 2365,
      seconds: 8514000
    },
    petHouse: {
      years: 1.1506849315068493,
      days: 420,
      hours: 10080,
      seconds: 36288000
    }
  },
  categories: {
    heroes: {
      years: 0.2699771689497717,
      days: 98.54166666666667,
      hours: 2365,
      seconds: 8514000
    },
    siege: {
      years: 0.4267123287671233,
      days: 155.75,
      hours: 3738,
      seconds: 13456800
    },
    troops: {
      years: 0.33801369863013697,
      days: 123.375,
      hours: 2961,
      seconds: 10659600
    },
    spells: {
      years: 0.8547945205479452,
      days: 312,
      hours: 7488,
      seconds: 26956800
    },
    pets: {
      years: 1.1506849315068493,
      days: 420,
      hours: 10080,
      seconds: 36288000
    }
  }
}
```

## How it works?

This module uses clashofclans.js's raw.json file to fetch the time to upgrade for all the upgradable items and then do calculations on it.

## Contributing

Any contributions you make are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a Pull Request.