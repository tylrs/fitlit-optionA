class UserRepository {
  //needs a parameter to take in all user data from fetch call
  constructor(userData, sleepData, activityData, hydrationData) {
    //OG code below:
    // this.users = [];
    this.users = userData;
    this.sleeps = sleepData;
    this.activities = activityData;
    this.hydrations = hydrationData;
  }
//refactored to ES6 arrow functions - check for context on DOM
  getUser(id) {
    return this.users.find(user => user.id === id);
  };

  updateUsersSleep() {
    this.sleeps.forEach((sleep) => {
      let userToUpdate = this.users.find((user) => {
        return user.id === sleep.userID
      })
      userToUpdate.updateSleep(sleep.date, sleep.hoursSlept, sleep.sleepQuality);
    })
  }

  updateUsersHydration() {
    this.hydrations.forEach((hydration) => {
      let userToUpdate = this.users.find((user) => {
        return user.id === hydration.userID
      })
      userToUpdate.updateHydration(hydration.date, hydration.ounces);
    })
  }

  updateUsersActivity() {
    this.activities.forEach((activity) => {
      let userToUpdate = this.users.find((user) => {
        return user.id === activity.userID
      })
      userToUpdate.updateActivities(activity);
    })
  }
//refactored to ES6 arrow functions - double check context on DOM
  calculateAverageStepGoal() {
    const total = this.users.reduce((accumulator, currentUser) => {
      accumulator += currentUser.dailyStepGoal
      return accumulator
    }, 0)
    return Math.round(total / this.users.length);
  }
//Are they using this one on the DOM?? Where is this being called?
//Where is the data coming from?
  // calculateAverageSleepQuality() {
  //   let totalSleepQuality = this.users.reduce((sum, user) => {
  //     sum += user.sleepQualityAverage;
  //     return sum;
  //   }, 0);
  //   return totalSleepQuality / this.users.length;
  // }
  calculateAverageSleepQuality() {
    let sleepQualityArray = this.users.reduce((newArray, currentUser) => {
      this.sleeps.forEach(sleep => {
        if (sleep.userID === currentUser.id) {
          newArray.push(sleep.sleepQuality)
        }
      })
      return newArray
    },[])
    let totalSleepQuality = sleepQualityArray.reduce((acc, currentNumber) => {
      return acc + currentNumber
    },0)
    return (totalSleepQuality / sleepQualityArray.length).toFixed(2)
  }
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
  // calculateAverage(date, quanitfier) {
  //   let allUsersCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfActivity = allUsersCount.reduce((sum, currentActivityCollection) => {
  //     currentActivityCollection.forEach(activity => {
  //       sum += activity[quanitfier]
  //     })
  //     return sum;
  //   }, 0);
  //   return Math.round(sumOfActivity / allUsersCount.length);
  // }
  calculateAverage(date, quanitfier) {
    let activitiesThatDay = this.activities.filter(currentActivity => currentActivity.date === date)
    let total = activitiesThatDay.reduce((acc, currentActivity) => {
      if (quanitfier === 'minutesActive') {
        acc += currentActivity.minutesActive
      }
      if (quanitfier === 'steps') {
        acc += currentActivity.numSteps
      }
      if (quanitfier === 'flightsOfStairs') {
        acc += currentActivity.flightsOfStairs
      }
      return acc
    },0)
    return total / activitiesThatDay.length
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

  // calculateAverageDailyWater() {
  //   let totalOunces = this.users.reduce((acc, currentUser) => {
  //     return acc + currentUser.ouncesAverage
  //   },0)
  //   return totalOunces / this.users.length
  // }

//Not called on DOM
  // findBestSleepers(date) {
  //   return this.users.filter(user => {
  //     return user.calculateAverageQualityThisWeek(date) > 3;
  //   })
  // }
  findBestSleepers(date) {
    let sleepsThatDay = this.sleeps.filter(currentSleep => currentSleep.date === date)
    let mostHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => b - a)[0]
    let bestSleepersThatDay = sleepsThatDay.filter(x => x.hoursSlept === mostHoursSleptThatDay)
    return this.users.reduce((newArray, currentUser) => {
      bestSleepersThatDay.forEach(currentBestSleeper => {
        if (currentUser.id === currentBestSleeper.userID) {
          newArray.push(currentUser)
        }
      })
      return newArray
    },[])
  }
//Refactor these two into one function?
//OG code below:
  // getLongestSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   })[0].userID;
  // }
  //
  // getWorstSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return a.hoursSlept - b.hoursSlept;
  //   })[0].userID;
  // }

  //refactored into one function, tests updated but one fails
  getSleeper(date, qualifier) {
    let sleepsThatDay = this.sleeps.filter(currentSleep => currentSleep.date === date)
    let mostHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => b - a)[0]
    let leastHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => a - b)[0]
    let bestSleepersThatDay = sleepsThatDay.filter(x => x.hoursSlept === mostHoursSleptThatDay)
    let worstSleepersThatDay = sleepsThatDay.filter(x => x.hoursSlept === leastHoursSleptThatDay)
  // getSleeper(date, qualifier, sleepData) {
  //   let sleeperData = sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   });

    if (qualifier === "best") {
      return bestSleepersThatDay.map(x => x.userID)
    } else {
      return worstSleepersThatDay.map(x => x.userID)
    }
  }
}

export default UserRepository;
