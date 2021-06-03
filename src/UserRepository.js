import sleepData from './data/sleep';

class UserRepository {
  //needs a parameter to take in all user data from fetch call
  constructor() {
    // this.users = userData;
    this.users = [];
  }

//refactored to ES6 arrow functions - check for context on DOM
  getUser(id) {
    return this.users.find(user => {
      return user.id === id;
    })
  }

//refactored to ES6 arrow functions - double check context on DOM
  calculateAverageStepGoal() {
    const total = this.users.reduce((accumulator, currentUser) => {
      accumulator += currentUser.dailyStepGoal
      return accumulator
    }, 0)
    return total / this.users.length;
  }

//Are they using this one on the DOM?? Where is this being called?
//Where is the data coming from?
  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      sum += user.sleepQualityAverage;
      return sum;
    }, 0);
    return totalSleepQuality / this.users.length;
  }

//
  // calculateAverageSteps(date) {
  //   //iterates over the users and then each user's activity record
  //   //to return an array of arrays that the activity records that match the date
  //   let allUsersStepsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   //console.log(allUsersStepsCount)
  //   //iterates over the allUsersStepsCount array (made above)
  //   // for each userActivity, iterate over the activity steps
  //   let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stepsSum += activity.steps
  //     })
  //     return stepsSum;
  //   }, 0);
  //   return Math.round(sumOfSteps / allUsersStepsCount.length);
  // }

  // calculateAverageStairs(date) {
  //   let allUsersStairsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stairsSum += activity.flightsOfStairs
  //     })
  //     return stairsSum;
  //   }, 0);
  //   return Math.round(sumOfStairs / allUsersStairsCount.length);
  // }

  // calculateAverageMinutesActive(date) {
  //   let allUsersMinutesActiveCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       minutesActiveSum += activity.minutesActive
  //     })
  //     return minutesActiveSum;
  //   }, 0);
  //   return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  // }

  calculateAverage(date, quanitfier) {
    let allUsersCount = this.users.map(user => {
      return user.activityRecord.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfActivity = allUsersCount.reduce((sum, currentActivityCollection) => {
      currentActivityCollection.forEach(activity => {
        sum += activity[quanitfier]
      })
      return sum;
    }, 0);
    return Math.round(sumOfActivity / allUsersCount.length);
  }


//Test calls this data in a very weird way - how do we access
// this data? via hydration?
//Is there a reason we want that 0 in there? can we remove it?
  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.users.filter(user => {
      return user.addDailyOunces(date) > 0;
    });
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.addDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }


//Not called on DOM
  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }


//Refactor these two into one function?
  getLongestSleepers(date) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return b.hoursSlept - a.hoursSlept;
    })[0].userID;
  }

  getWorstSleepers(date) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return a.hoursSlept - b.hoursSlept;
    })[0].userID;
  }
}

export default UserRepository;
