import './css/base.scss';
import './css/styles.scss';
import { fetchApiData } from './apiCalls';
// import { populateUserCard } from  './domUpdates';
import domUpdates from './domUpdates';
// console.log(domUpdates)
// import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

let todayDate = "2020/01/16";
let userData, activityData, hydrationData, sleepData, user, userRepository;

let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.querySelector('#dropdown-email');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let dropdownName = document.querySelector('#dropdown-name');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
let stepsTrendingButton = document.querySelector('.steps-trending-button');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');
let adtlInfo = document.querySelector('#adtlInfo');

// import { populateUserCard } from  './domUpdates';

window.addEventListener('load', fetchData);

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', function() {
  domUpdates.showDropdown(userInfoDropdown)});
stairsTrendingButton.addEventListener('click', updateTrendingStairsDOM);
stepsTrendingButton.addEventListener('click', updateTrendingStepsDOM);

function getData() {
  return Promise.all([fetchApiData('users'), fetchApiData('sleep'), fetchApiData('activity'), fetchApiData('hydration')]);
}

function fetchData() {
  getData()
  .then((promiseArray) => {
    userData = promiseArray[0].userData;
    sleepData = promiseArray[1].sleepData;
    activityData = promiseArray[2].activityData;
    hydrationData = promiseArray[3].hydrationData;
    instantiateData()
    populateDOM()
  });
};

function instantiateData() {
  let usersData = userData.map(user => {
    return new User(user);
    // userRepository.users.push(user)
  });
  userRepository = new UserRepository(usersData);

  sleepData.forEach(sleep => {
    sleep = new Sleep(sleep, userRepository);
  });

  activityData.forEach(activity => {
    activity = new Activity(activity, userRepository);
  });

  hydrationData.forEach(hydration => {
    hydration = new Hydration(hydration, userRepository);
  });

  user = userRepository.users[0];
  user.findFriendsNames(userRepository.users);
}

function populateDOM() {
  populateUserCard()
  populateStepCard()
  populateClimbedCard()
  populateHydrationCard()
  populateSleepCard()
}

function populateUserCard() {
  headerName.innerText = `${user.getFirstName()}'S `;
  dropdownName.innerText = user.name.toUpperCase();
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownGoal.innerHTML = `DAILY STEP GOAL | ${user.dailyStepGoal}
  <br>average step goal amongst all users | ${userRepository.calculateAverageStepGoal()}
  <br>your goal/average of all users goal | ${((user.dailyStepGoal / userRepository.calculateAverageStepGoal()) * 100).toFixed(0)}%`;
  populateFriends()
  adtlInfo.innerHTML = `Your ID: ${user.id}<br>Your Addy: ${user.address}<br>Your Stride Length: ${user.strideLength}<br>`
}

function populateFriends() {
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

  // user.friendsActivityRecords.forEach(friend => {
  //   dropdownFriendsStepsContainer.innerHTML += `
  //   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  //   `;
  // });
  domUpdates.populateHTMLArray(user.friendsActivityRecords, dropdownFriendsStepsContainer)

  domUpdates.applyFriendStyling()
}

//////////// New stuff below
function findData(data, property) {
  let found = data.find(activity => {
    //console.log("activity", activity.date)
    return activity.userID === user.id && activity.date === todayDate;
  })[property]
  return found
}

function findRecord() {
  let record = user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository);
  return record;
}

function findSleeper(qualifier) {
  //console.log(qualifier)
  let found = userRepository.users.find(user => {
    //console.log(qualifier)
    return user.id === userRepository.getSleeper(todayDate, qualifier, sleepData)
  }).getFirstName()
  return found
}

function populateStepCard() {
  //main card:
  domUpdates.cardDisplay(stepsUserStepsToday, findData(activityData, "numSteps"))

//info-card
  domUpdates.cardDisplay(stepsInfoActiveMinutesToday, findData(activityData, "minutesActive"))
  domUpdates.cardDisplay(stepsInfoMilesWalkedToday, findRecord())

//friends card:
  domUpdates.cardDisplay(stepsFriendActiveMinutesAverageToday, userRepository.calculateAverage(todayDate, "minutesActive"));

  domUpdates.cardDisplay(stepsFriendStepsAverageToday, userRepository.calculateAverage(todayDate, "steps"));

  domUpdates.cardDisplay(stepsFriendAverageStepGoal, `${userRepository.calculateAverageStepGoal()}`);

//calendar card:
  domUpdates.cardDisplay(stepsCalendarTotalActiveMinutesWeekly, user.calculateAverageMinutesActiveThisWeek(todayDate));

  domUpdates.cardDisplay(stepsCalendarTotalStepsWeekly, user.calculateAverageStepsThisWeek(todayDate));


//trending card
//Is there DOM shit in the user class method below?
  user.findTrendingStepDays();
}

function populateClimbedCard() {
  //main card:
  domUpdates.cardDisplay(stairsUserStairsToday, (findData(activityData, "flightsOfStairs") * 12))

  //info card:
  domUpdates.cardDisplay(stairsInfoFlightsToday, findData(activityData, "flightsOfStairs"))

  //friend card:
  domUpdates.cardDisplay(stairsFriendFlightsAverageToday, (userRepository.calculateAverage(todayDate, "flightsOfStairs") / 12).toFixed(1))

//calendarCard:
  domUpdates.cardDisplay(stairsCalendarFlightsAverageWeekly, user.calculateAverageFlightsThisWeek(todayDate))

  domUpdates.cardDisplay(stairsCalendarStairsAverageWeekly, (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0))

  //trending card:
  user.findTrendingStairsDays();
}

function populateHydrationCard() {
  //main card:
  domUpdates.cardDisplay(hydrationUserOuncesToday, findData(hydrationData, "numOunces"));

  //info card:
  domUpdates.cardDisplay(hydrationInfoGlassesToday, (findData(hydrationData, "numOunces") / 8).toFixed(1));

//friend card:
  domUpdates.cardDisplay(hydrationFriendOuncesToday, userRepository.calculateAverageDailyWater(todayDate));

//calendar card:
  let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    return Object.keys(b)[0] - Object.keys(a)[0];
  });

//find index of today's date
//splice out all elements prior in array
  dailyOz.forEach((ounce, index) => {
    ounce.innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[index])[0])
  })
  // domUpdates.populateArray(dailyOz,   user.addDailyOunces(Object.keys(sortedHydrationDataByDate[index])[0]))
}

function populateSleepCard() {
  //main card:
  domUpdates.cardDisplay(sleepUserHoursToday, findData(sleepData, "hoursSlept"));

  //info card:
  domUpdates.cardDisplay(sleepInfoQualityToday, findData(sleepData, "sleepQuality"));
  domUpdates.cardDisplay(sleepInfoHoursAverageAlltime, user.hoursSleptAverage);
  domUpdates.cardDisplay(sleepInfoQualityAverageAlltime, user.sleepQualityAverage);

//friend card:
  domUpdates.cardDisplay(sleepFriendLongestSleeper, findSleeper("best"));
  domUpdates.cardDisplay(sleepFriendWorstSleeper, findSleeper("worst"));

//calendar card:
  domUpdates.cardDisplay(sleepCalendarHoursAverageWeekly, user.calculateAverageHoursThisWeek(todayDate));

  domUpdates.cardDisplay(sleepCalendarQualityAverageWeekly, user.calculateAverageQualityThisWeek(todayDate));
}

//is there a way we can refactor these without having the event listeners?
function updateTrendingStepsDOM() {
  domUpdates.trendingDisplay(trendingStepsPhraseContainer, user.trendingStepDays[0])
}

function updateTrendingStairsDOM() {
  domUpdates.trendingDisplay(trendingStairsPhraseContainer, user.trendingStairsDays[0])
}

/////////////

// function applyFriendStyling() {
//   let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//   friendsStepsParagraphs.forEach(paragraph => {
//     if (friendsStepsParagraphs[0] === paragraph) {
//       paragraph.classList.add('green-text');
//     }
//     if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//       paragraph.classList.add('red-text');
//     }
//     if (paragraph.innerText.includes('YOU')) {
//       paragraph.classList.add('yellow-text');
//     }
//   });
// }


// function populateStepCard() {
//   stepsUserStepsToday.innerText = activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).numSteps;
//
//   stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//     return activity.userID === user.id && activity.date === todayDate;
//   }).minutesActive;
//
//   stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//     return (activity.date === todayDate && activity.userId === user.id)
//   }).calculateMiles(userRepository);
//
//   //refactored this function in userRepo
//   // stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
//
//   stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverage(todayDate, "minutesActive");
//
// //refactored in userRepo class to be calculateAverage
//   // stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
//   stepsFriendStepsAverageToday.innerText = userRepository.calculateAverage(todayDate, "steps");
//
//   stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
//
//   stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
//   stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
//
//   user.findTrendingStepDays();
// }

// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }

// stepsTrendingButton.addEventListener('click', function () {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });

// function populateClimbedCard() {
//   // stairsUserStairsToday.innerText = activityData.find(activity => {
//   //   return activity.userID === user.id && activity.date === todayDate;
//   // }).flightsOfStairs * 12;
//
//   stairsUserStairsToday.innerText = (findData(activityData, "flightsOfStairs") * 12);
//
//   // stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   //   return activity.userID === user.id && activity.date === todayDate;
//   // }).flightsOfStairs;
//
//   stairsInfoFlightsToday.innerText = findData(activityData, "flightsOfStairs");
//
// //refactored in userRepo class to be calculateAverage
//   // stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
//   stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverage(todayDate, "flightsOfStairs") / 12).toFixed(1);
//
//
//   stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//   // stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//   stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//   // stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
//   user.findTrendingStairsDays();
// }

// function updateTrendingStairsDays() {
//   console.log(user)
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }
// function updateTrendingStepsDOM() {
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }

// function updateTrendingStepsDOM() {
//   domUpdates.trendingDisplay(trendingStepsPhraseContainer, user.trendingStepDays[0])
// }
//
// function updateTrendingStairsDOM() {
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }

//  stairsTrendingButton.addEventListener('click', function () {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// });

// function populateHydrationCard() {
//   hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//     return hydration.userID === user.id && hydration.date === todayDate;
//   }).numOunces;
//
//   hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//     return hydration.userID === user.id && hydration.date === todayDate;
//   }).numOunces / 8;
//
//   hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
//
//   let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//     if (Object.keys(a)[0] > Object.keys(b)[0]) {
//       return -1;
//     }
//     if (Object.keys(a)[0] < Object.keys(b)[0]) {
//       return 1;
//     }
//     return 0;
//   });
//
//   for (var i = 0; i < dailyOz.length; i++) {
//     dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
//   }
// }

// function populateSleepCard() {
//   sleepUserHoursToday.innerText = sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).hoursSlept;
//
//   sleepInfoQualityToday.innerText = sleepData.find(sleep => {
//     return sleep.userID === user.id && sleep.date === todayDate;
//   }).sleepQuality;
//
//   sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
//
//   sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
//
//   sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//     return user.id === userRepository.getSleeper(todayDate, "best")
//   }).getFirstName();
//
//   sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//     return user.id === userRepository.getSleeper(todayDate)
//   }).getFirstName();
//
//   sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
//
//   sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
// }

//HELPERS
// function showDropdown() {
//   userInfoDropdown.classList.toggle('hide');
// }

// function showInfo(event) {
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }
//
// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

function showInfo(event) {
  let cards = {
    stepsMainCard,
    stepsInfoCard,
    stepsFriendsCard,
    stepsTrendingCard,
    stepsCalendarCard,
    hydrationMainCard,
    hydrationInfoCard,
    hydrationFriendsCard,
    hydrationCalendarCard,
    stairsMainCard,
    stairsInfoCard,
    stairsFriendsCard,
    stairsTrendingCard,
    stairsCalendarCard,
    sleepMainCard,
    sleepInfoCard,
    sleepFriendsCard,
    sleepCalendarCard,
  }
  if (event.target.classList.contains('go-back-button')) {
    event.target.closest('section').classList.add('hide');
    let cardToShow = cards[`${event.target.closest('section').id.split('-')[0]}MainCard`]
    cardToShow.classList.remove('hide');
  } else if (event.target.type === 'button') {
    event.target.closest('.main-card').classList.add('hide');
    let cardToShow = cards[`${event.target.id}Card`]
    cardToShow.classList.remove('hide');
  }
}

// export default scripts;
