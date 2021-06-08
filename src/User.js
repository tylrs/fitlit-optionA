import UserRepository from '../src/UserRepository';
import { userTestData, sleepTestData, activityTestData, hydrationTestData } from '../test/sampleData.js';
let userTestRepository = new UserRepository(userTestData, sleepTestData, activityTestData, hydrationTestData);

 class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.totalStepsThisWeek = 0;
    this.friends = userData.friends;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = [];
  }
  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  compareStepGoal(todayDate) {
    let foundActivity = this.activityRecord.find((activity) => {
      return activity.date === todayDate;
    })
    if (foundActivity.numSteps >= this.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  calculateMiles(todayDate) {
    let foundActivity = this.activityRecord.find((activity) => {
      return activity.date === todayDate;
    })
    return Math.round(foundActivity.numSteps * this.strideLength / 5280).toFixed(1)
  }

  updateHydration(date, amount) {
    this.ouncesRecord.unshift({[date]: amount});
    if (this.ouncesRecord.length) {
      this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
    } else {
      this.ouncesAverage = amount;
    }
  }
  //I don't think we need this anymore
  // considering the way calculateAverageDailyWater has been refactored - Alex
  addDailyOunces(date) {
    return this.ouncesRecord.reduce((sum, record) => {
      let amount = record[date];
      if (amount) {
        sum += amount
      }
      return sum
    }, 0)
  }
  calculateWeekEarlier(date) {
    let aWeekEarlier = new Date(date)
    aWeekEarlier.setDate(aWeekEarlier.getDate()-6)
    let string = aWeekEarlier.toLocaleDateString()
    let split = string.split('/')
    let month = split[0]
    let day = split[1]
    let formattedMonth = ("0" + month).slice(-2);
    let formattedDay = ("0" + day).slice(-2);
    let newDate = `${split[2]}/${formattedMonth}/${formattedDay}`
    return newDate
  }
  //Alex's attempt to solve a test that was misleading
  //(given a date show the past weeks average consumption of water)
  // addDailyOunces(date) {
  //   let aWeekEarlier = new Date(date)
  //   aWeekEarlier.setDate(aWeekEarlier.getDate()-7)
  //   let string = aWeekEarlier.toLocaleDateString()
  //   let split = string.split('/')
  //   let month = split[0]
  //   let day = split[1]
  //   let formattedMonth = ("0" + month).slice(-2);
  //   let formattedDay = ("0" + day).slice(-2);
  //   let newDate = `${split[2]}/${formattedMonth}/${formattedDay}`
  //   this.ouncesRecord = userTestRepository.hydrations.reduce((newArray, currentHydration) => {
  //     let newObj = {}
  //     if (currentHydration.date <= date & currentHydration.date >= newDate) {
  //       newObj[currentHydration.date] = currentHydration.numOunces
  //       newArray.push(newObj)
  //     }
  //     return newArray
  //   },[])
  //   let total = this.ouncesRecord.reduce((acc, currentRecord) => {
  //     return acc + currentRecord
  //   },0)
  //   console.log(Object.values(this.ouncesRecord))
  // }
  updateSleep(date, hours, quality) {
    this.sleepHoursRecord.unshift({
      'date': date,
      'hours': hours
    });
    this.sleepQualityRecord.unshift({
      'date': date,
      'quality': quality
    });
    if(this.sleepHoursRecord.length) {
      this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
    } else {
      this.hoursSleptAverage = hours;
    }
    if (this.sleepQualityRecord.length) {
      this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);
    } else {
      this.sleepQualityAverage = quality;
    }
  }
  // calculateAverageHoursThisWeek(todayDate) {
  //   return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
  //     if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.hours;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  calculateAverageHoursThisWeek(todayDate) {
    let foundSleeps = this.sleepHoursRecord.filter(sleepRecord => {
      return sleepRecord.date >= this.calculateWeekEarlier(todayDate) && sleepRecord.date <= todayDate})
    let totalHours = foundSleeps.reduce((acc, currentSleep) => {
      return acc + currentSleep.hours
    },0)
    return (totalHours / foundSleeps.length).toFixed(1)
  }
  // calculateAverageQualityThisWeek(todayDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  calculateAverageQualityThisWeek(todayDate) {
    let foundSleeps = this.sleepQualityRecord.filter(sleepRecord => {
      return sleepRecord.date >= this.calculateWeekEarlier(todayDate) && sleepRecord.date <= todayDate})
    let totalQuality = foundSleeps.reduce((acc, currentSleep) => {
      return acc + currentSleep.quality
    },0)
    return (totalQuality / foundSleeps.length).toFixed(1)
  }
  updateActivities(activity) {
    this.activityRecord.unshift(activity);
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }
  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }
  calculateDailyCalories(date) {
    let totalMinutes = this.activityRecord.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }
  calculateAverageMinutesActiveThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.minutesActive;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }
  calculateAverageStepsThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }
  calculateAverageFlightsThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.flightsOfStairs;
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }
  findTrendingStepDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i].numSteps > this.activityRecord[i + 1].numSteps) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }
  findTrendingStairsDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i].flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }
  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }
  calculateTotalStepsThisWeek(todayDate) {
    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }
  findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          // 'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    // this.calculateTotalStepsThisWeek(date);
    // this.friendsActivityRecords.push({
    //   'id': this.id,
    //   'firstName': 'YOU',
    //   'totalWeeklySteps': this.totalStepsThisWeek
    // });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }
}

export default User;
