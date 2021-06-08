class UserRepository {
  constructor(userData, sleepData, activityData, hydrationData) {
    this.users = userData;
    this.sleeps = sleepData;
    this.activities = activityData;
    this.hydrations = hydrationData;
  }

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
      userToUpdate.updateHydration(hydration.date, hydration.numOunces);
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

  calculateAverageStepGoal() {
    const total = this.users.reduce((accumulator, currentUser) => {
      accumulator += currentUser.dailyStepGoal
      return accumulator
    }, 0)
    return Math.round(total / this.users.length);
  }

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
    return Math.round(total / activitiesThatDay.length)
  }

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
  // findBestSleepersWeek(date) {
  //   return this.users.filter(user => {
  //     return user.calculateAverageQualityThisWeek(date) > 3;
  //   })
  // }
  findBestSleepersWeek(date) {
    return this.users.filter(user => {
       return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }
  findBestSleepersDay(date) {
    let sleepsThatDay = this.sleeps.filter(currentSleep => currentSleep.date === date)
    let mostHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => b - a)[0]
    let bestSleepersThatDay = sleepsThatDay.filter(oneSleep => oneSleep.hoursSlept === mostHoursSleptThatDay)
    return this.users.reduce((newArray, currentUser) => {
      bestSleepersThatDay.forEach(currentBestSleeper => {
        if (currentUser.id === currentBestSleeper.userID) {
          newArray.push(currentUser)
        }
      })
      return newArray
    },[])
  }

  getSleeper(date, qualifier) {
    let sleepsThatDay = this.sleeps.filter(currentSleep => currentSleep.date === date)
    let mostHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => b - a)[0]
    let leastHoursSleptThatDay = sleepsThatDay.map(currentSleep => {
      return currentSleep.hoursSlept
    }).sort((a, b) => a - b)[0]
    let bestSleepersThatDay = sleepsThatDay.filter(oneSleep => oneSleep.hoursSlept === mostHoursSleptThatDay)
    let worstSleepersThatDay = sleepsThatDay.filter(oneSleep => oneSleep.hoursSlept === leastHoursSleptThatDay)
    if (qualifier === "best") {
      return bestSleepersThatDay.map(x => x.userID)
    } else {
      return worstSleepersThatDay.map(x => x.userID)
    }
  }
}

export default UserRepository;
