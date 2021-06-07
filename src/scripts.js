// import './css/base.scss';
// import './css/styles.scss';
import './sass/index.scss';
import domUpdates from './domUpdates';
import { fetchApiData, postApiData } from './apiCalls';

// import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

let todayDate = "2019/09/05";
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
// Form Query Selectors
let sleepSubmitButton = document.querySelector('#sleepSubmitButton');
let hoursSleptUserInput = document.querySelector('#hoursSlept');
let sleepQualityUserInput = document.querySelector('#sleepQuality');
let sleepFormCard = document.querySelector('#sleep-form-card');

let hydrationSubmitButton = document.querySelector('#hydrationSubmitButton');
let numOuncesUserInput = document.querySelector('#numOunces');
let hydrationFormCard = document.querySelector('#hydration-form-card');

let activitySubmitButton = document.querySelector('#activitySubmitButton');
let numStepsUserInput = document.querySelector('#numSteps');
let minutesActiveUserInput = document.querySelector('#minutesActive');
let flightsOfStairsUserInput = document.querySelector('#flightsOfStairs');
let activityFormCard = document.querySelector('#activity-form-card');

let hydrationFormMessage = document.querySelector('.hydration-form h3');
let sleepFormMessage = document.querySelector('.sleep-form h3');
let activityFormMessage = document.querySelector('.activity-form h3');

//
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

window.addEventListener('load', fetchData);

profileButton.addEventListener('click', function() {
  domUpdates.showDropdown(userInfoDropdown)});
// stairsTrendingButton.addEventListener('click', updateTrendingStairsDOM);
// stepsTrendingButton.addEventListener('click', updateTrendingStepsDOM);
stairsTrendingButton.addEventListener('click', function () {
  updateTrending(trendingStairsPhraseContainer, user.trendingStairsDays[0])
});
stepsTrendingButton.addEventListener('click', function () {
  updateTrending(trendingStepsPhraseContainer, user.trendingStepDays[0])
});
mainPage.addEventListener('click', function() {
  determineShoworSubmit(event)
});
// mainPage.addEventListener('click', function () {
//   domUpdates.determineShoworSubmit(event)});
// profileButton.addEventListener('click', showDropdown);

function determineShoworSubmit(event) {
  event.preventDefault()
  if (event.target.classList.contains('new-data-submit-button')) {
    sortForm(event);
  } else {
    showInfo(event);
  }
}

function sortForm(event) {
  let inputData, type;
  if (event.target.id === 'sleepSubmitButton') {
    let hoursSleptInput = parseInt(hoursSleptUserInput.value);
    let sleepQualityInput = parseInt(sleepQualityUserInput.value);
    inputData = {hoursSleptInput, sleepQualityInput};
    type = 'sleep';
  } else if (event.target.id === 'hydrationSubmitButton') {
    let numOuncesInput = parseInt(numOuncesUserInput.value);
    inputData = {numOuncesInput};
    type = 'hydration';
  } else if (event.target.id === 'activitySubmitButton') {
    let numStepsInput = parseInt(numStepsUserInput.value);
    let minutesActiveInput = parseInt(minutesActiveUserInput.value);
    let flightsOfStairsInput = parseInt(flightsOfStairsUserInput.value);
    inputData = {numStepsInput, minutesActiveInput, flightsOfStairsInput};
    type = 'activity';
  }
  postData(type, inputData)
}

function postData(type, inputData) {
  let userId = user.id;
  postApiData(type, {userId, todayDate, inputData})
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      renderSuccessfulPost(type);
    }
  })
  .catch(error => {
    showPostMessage(type, 'fail', error)
  })
}

function renderSuccessfulPost(type) {
  showPostMessage(type, 'success')
  fetchApiData(type)
  .then((data) => {
    if (type === 'sleep') {
      sleepData = data.sleepData;
    } else if (type === 'hydration') {
      hydrationData = data.hydrationData;
    } else if (type === 'activity') {
      activityData = data.activityData;
    }
    instantiateData();
    populateDOM();
  })
}

///////////////New Post stuff below:
// function sortForm(event) {
//   let inputFields = {
//     hoursSleptUserInput,
//     sleepQualityUserInput,
//     numOuncesUserInput,
//     numStepsUserInput,
//     minutesActiveUserInput,
//     flightsOfStairsUserInput,
//   }
//   domUpdates.determinePostData(event, inputFields);
  // let inputData, type;
  // if (event.target.id === 'sleepSubmitButton') {
  //   let hoursSleptInput = parseInt(hoursSleptUserInput.value);
  //   let sleepQualityInput = parseInt(sleepQualityUserInput.value);
  //   inputData = {hoursSleptInput, sleepQualityInput};
  //   type = 'sleep';
  // } else if (event.target.id === 'hydrationSubmitButton') {
  //   let numOuncesInput = parseInt(numOuncesUserInput.value);
  //   inputData = {numOuncesInput};
  //   type = 'hydration';
  // } else if (event.target.id === 'activitySubmitButton') {
  //   let numStepsInput = parseInt(numStepsUserInput.value);
  //   let minutesActiveInput = parseInt(minutesActiveUserInput.value);
  //   let flightsOfStairsInput = parseInt(flightsOfStairsUserInput.value);
  //   inputData = {numStepsInput, minutesActiveInput, flightsOfStairsInput};
  //   type = 'activity';
  // }
  // postData(type, inputData)
// }
function showPostMessage(type, status, responseStatus) {
  let messageSelectors = {
    hydrationFormMessage,
    sleepFormMessage,
    activityFormMessage
  }
  domUpdates.facilitatePostMessage(type, status, responseStatus, messageSelectors, user)
}
//////////////////////

//Old stuff below:
// function showPostMessage(type, status, responseStatus) {
//   let newMessage;
//   let messageSelectors = {
//     hydrationFormMessage,
//     sleepFormMessage,
//     activityFormMessage
//   }
//   let originalMessage = messageSelectors[`${type}FormMessage`].innerText;
//   if (status === 'success') {
//     newMessage = `DATA RECEIVED! THANK YOU FOR SUBMITTING ${user.getFirstName()}.`;
//   } else {
//     newMessage = `Sorry ${user.getFirstName()}, there was an ${responseStatus.message}`;
//   }
//   messageSelectors[`${type}FormMessage`].innerText = newMessage;
//   const resetMessage = setTimeout(() => {
//     messageSelectors[`${type}FormMessage`].innerText = originalMessage;
//   }, 5000)
// }

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
  });
  // let newActivityData = activityData.map((activity) => {
  //   let newActivity = new Activity(activity);
  //   return newActivity;
  // })

  userRepository = new UserRepository(usersData, sleepData, activityData, hydrationData);
  // userRepository = new UserRepository(usersData);


  userRepository.updateUsersSleep();
  userRepository.updateUsersActivity();
  userRepository.updateUsersHydration();


  // sleepData.forEach(sleep => {
  //   sleep = new Sleep(sleep, userRepository);
  // });

  // activityData.forEach(activity => {
  //   activity = new Activity(activity, userRepository);
  // });
  // console.log(userRepository.users[0].activityRecord)
  // hydrationData.forEach(hydration => {
  //   hydration = new Hydration(hydration, userRepository);
  // });

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

//////////// New stuff below
function populateFriends() {
  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
  domUpdates.populateHTMLArray(user.friendsActivityRecords, dropdownFriendsStepsContainer)

  domUpdates.applyFriendStyling()
}

function populateUserCard() {
  domUpdates.headerDisplay(headerName, user.getFirstName());
  domUpdates.cardDisplay(dropdownName, user.name);
  domUpdates.emailDisplay(dropdownEmail, user.email);
  domUpdates.populateDropDown(dropdownGoal, user, userRepository);
  populateFriends()
  domUpdates.populateAdditionalInfo(adtlInfo, user);
}


function findData(data, property) {
  let found = data.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  })[property]
  return found
}

//this just calls calculate miles on user class
// function find() {
//   // let record = user.activityRecord.find(activity => {
//   //   return (activity.date === todayDate && activity.userId === user.id)
//   // }).calculateMiles(userRepository);
//   let record = user.calculateMiles(todayDate);
//   return record;
// }

//move this to userRepo
function findSleeper(qualifier) {
  let foundSleepers = userRepository.users.filter(user => {
    return userRepository.getSleeper(todayDate, qualifier).includes(user.id);
  })
  let names = foundSleepers.map((sleeper) => {
    return sleeper.getFirstName();
  })
  if (names.length > 1) {
    names = names.join(' AND ')
  }
  return names;
}


//Population Card Functions
function populateMainCard(element, data) {
  domUpdates.cardDisplay(element, data);
}
//   stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverage(todayDate, "minutesActive").toFixed(0);
//
// //refactored in userRepo class to be calculateAverage
//   // stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
//   stepsFriendStepsAverageToday.innerText = userRepository.calculateAverage(todayDate, "steps").toFixed(0);

function populateIterateCard(queries, finds) {
  //iterate through queries and finds to match up the same indexes
  queries.forEach((query, queryIndex) => {
    finds.forEach((find, findIndex) => {
      if (queryIndex === findIndex) {
        domUpdates.cardDisplay(query, find)
      }
    })
  })
}

// function populateFriendCard(friendInfo) {
//   for (const query in friendInfo) {
//     domUpdates.cardDisplay(query, friendInfo[query])
//   }
// }

//Individual Card functions
function populateStepCard() {
  //main card:
  // domUpdates.cardDisplay(stepsUserStepsToday, findData(activityData, "numSteps"))
  populateMainCard(stepsUserStepsToday, findData(activityData, "numSteps"))

//info-card
  // domUpdates.cardDisplay(stepsInfoActiveMinutesToday, findData(activityData, "minutesActive"))
  // domUpdates.cardDisplay(stepsInfoMilesWalkedToday, findRecord())
  populateIterateCard([stepsInfoActiveMinutesToday, stepsInfoMilesWalkedToday], [findData(activityData, "minutesActive"), user.calculateMiles(todayDate)])

//friends card:
  // domUpdates.cardDisplay(stepsFriendActiveMinutesAverageToday, userRepository.calculateAverage(todayDate, "minutesActive"));
  //
  // domUpdates.cardDisplay(stepsFriendStepsAverageToday, userRepository.calculateAverage(todayDate, "steps"));
  //
  // domUpdates.cardDisplay(stepsFriendAverageStepGoal, `${userRepository.calculateAverageStepGoal()}`);

  populateIterateCard([stepsFriendActiveMinutesAverageToday, stepsFriendStepsAverageToday, stepsFriendAverageStepGoal], [userRepository.calculateAverage(todayDate, "minutesActive"), userRepository.calculateAverage(todayDate, "steps"), `${userRepository.calculateAverageStepGoal()}`]);

//calendar card:
  // domUpdates.cardDisplay(stepsCalendarTotalActiveMinutesWeekly, user.calculateAverageMinutesActiveThisWeek(todayDate));
  //
  // domUpdates.cardDisplay(stepsCalendarTotalStepsWeekly, user.calculateAverageStepsThisWeek(todayDate));

  populateIterateCard([stepsCalendarTotalActiveMinutesWeekly, stepsCalendarTotalStepsWeekly], [user.calculateAverageMinutesActiveThisWeek(todayDate), user.calculateAverageStepsThisWeek(todayDate)]);


//trending card
//Is there DOM shit in the user class method below?
  user.findTrendingStepDays();
}

function populateClimbedCard() {
  //main card:
  //domUpdates.cardDisplay(stairsUserStairsToday, (findData(activityData, "flightsOfStairs") * 12))
  populateMainCard(stairsUserStairsToday, (findData(activityData, "flightsOfStairs") * 12))

  //info card:
  //domUpdates.cardDisplay(stairsInfoFlightsToday, findData(activityData, "flightsOfStairs"))
  populateIterateCard([stairsInfoFlightsToday], [findData(activityData, "flightsOfStairs")])

  //friend card:
  //domUpdates.cardDisplay(stairsFriendFlightsAverageToday, (userRepository.calculateAverage(todayDate, "flightsOfStairs") / 12).toFixed(1))

  populateIterateCard([stairsFriendFlightsAverageToday], [(userRepository.calculateAverage(todayDate, "flightsOfStairs") / 12).toFixed(1)])

//calendarCard:
  //domUpdates.cardDisplay(stairsCalendarFlightsAverageWeekly, user.calculateAverageFlightsThisWeek(todayDate))

  //domUpdates.cardDisplay(stairsCalendarStairsAverageWeekly, (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0))

  populateIterateCard([stairsCalendarFlightsAverageWeekly, stairsCalendarStairsAverageWeekly], [user.calculateAverageFlightsThisWeek(todayDate), (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0)]);

  //trending card:
  user.findTrendingStairsDays();
}

function populateHydrationCard() {
  //main card:
  //domUpdates.cardDisplay(hydrationUserOuncesToday, findData(hydrationData, "numOunces"));
  populateMainCard(hydrationUserOuncesToday, findData(hydrationData, "numOunces"));

  //info card:
  //domUpdates.cardDisplay(hydrationInfoGlassesToday, (findData(hydrationData, "numOunces") / 8).toFixed(1));
  populateIterateCard([hydrationInfoGlassesToday], [(findData(hydrationData, "numOunces") / 8).toFixed(1)])

//friend card:
  //domUpdates.cardDisplay(hydrationFriendOuncesToday, userRepository.calculateAverageDailyWater(todayDate));
  populateIterateCard([hydrationFriendOuncesToday], [userRepository.calculateAverageDailyWater(todayDate)]);

//calendar card:
  let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    return Object.keys(b)[0] - Object.keys(a)[0];
  });

//find index of today's date
//splice out all elements prior in array
  domUpdates.populateTextArray(dailyOz, sortedHydrationDataByDate, user)
}

function populateSleepCard() {
  //main card:
  //domUpdates.cardDisplay(sleepUserHoursToday, findData(sleepData, "hoursSlept"));
  populateMainCard(sleepUserHoursToday, findData(sleepData, "hoursSlept"));

  //info card:
  //domUpdates.cardDisplay(sleepInfoQualityToday, findData(sleepData, "sleepQuality"));
  //domUpdates.cardDisplay(sleepInfoHoursAverageAlltime, user.hoursSleptAverage);
  //domUpdates.cardDisplay(sleepInfoQualityAverageAlltime, user.sleepQualityAverage);
  populateIterateCard([sleepInfoQualityToday, sleepInfoHoursAverageAlltime, sleepInfoQualityAverageAlltime], [findData(sleepData, "sleepQuality"), user.hoursSleptAverage, user.sleepQualityAverage])

//friend card:
  //domUpdates.cardDisplay(sleepFriendLongestSleeper, findSleeper("best"));
  //domUpdates.cardDisplay(sleepFriendWorstSleeper, findSleeper("worst"));
  populateIterateCard([sleepFriendLongestSleeper, sleepFriendWorstSleeper], [findSleeper("best"), findSleeper("worst")]);

//calendar card:
  //domUpdates.cardDisplay(sleepCalendarHoursAverageWeekly, user.calculateAverageHoursThisWeek(todayDate));

  //domUpdates.cardDisplay(sleepCalendarQualityAverageWeekly, user.calculateAverageQualityThisWeek(todayDate));

  populateIterateCard([sleepCalendarHoursAverageWeekly, sleepCalendarQualityAverageWeekly], [user.calculateAverageHoursThisWeek(todayDate), user.calculateAverageQualityThisWeek(todayDate)]);
}


function updateTrending(element, data) {
  domUpdates.trendingDisplay(element, data)
}

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
    sleepFormCard,
    hydrationFormCard,
    activityFormCard
  }
  domUpdates.facilitateCardChange(event, cards)
}

//is there a way we can refactor these without having the event listeners?
// function updateTrendingStepsDOM() {
  //   domUpdates.trendingDisplay(trendingStepsPhraseContainer, user.trendingStepDays[0])
  // }
  //
  // function updateTrendingStairsDOM() {
    //   domUpdates.trendingDisplay(trendingStairsPhraseContainer, user.trendingStairsDays[0])
    // }
/////////////


// function populateFriends() {
//   user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
//
//   // user.friendsActivityRecords.forEach(friend => {
//   //   dropdownFriendsStepsContainer.innerHTML += `
//   //   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   //   `;
//   // });
//   domUpdates.populateHTMLArray(user.friendsActivityRecords, dropdownFriendsStepsContainer)
//
//   domUpdates.applyFriendStyling()
// }
// function populateUserCard() {
//   //headerName.innerText = `${user.getFirstName()}'S `;
//
//   //dropdownName.innerText = user.name.toUpperCase();
//
//   //dropdownEmail.innerText = `EMAIL | ${user.email}`;
//
//   // dropdownGoal.innerHTML = `DAILY STEP GOAL | ${user.dailyStepGoal}
//   // <br>average step goal amongst all users | ${userRepository.calculateAverageStepGoal()}
//   // <br>your goal/average of all users goal | ${((user.dailyStepGoal / userRepository.calculateAverageStepGoal()) * 100).toFixed(0)}%`;
//
//   // adtlInfo.innerHTML = `Your ID: ${user.id}<br>Your Addy: ${user.address}<br>Your Stride Length: ${user.strideLength}<br>`
//
// }


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

// function showInfo(event) {
//   let cards = {
//     stepsMainCard,
//     stepsInfoCard,
//     stepsFriendsCard,
//     stepsTrendingCard,
//     stepsCalendarCard,
//     hydrationMainCard,
//     hydrationInfoCard,
//     hydrationFriendsCard,
//     hydrationCalendarCard,
//     stairsMainCard,
//     stairsInfoCard,
//     stairsFriendsCard,
//     stairsTrendingCard,
//     stairsCalendarCard,
//     sleepMainCard,
//     sleepInfoCard,
//     sleepFriendsCard,
//     sleepCalendarCard,
//   }
//   if (event.target.classList.contains('go-back-button')) {
//     event.target.closest('section').classList.add('hide');
//     let cardToShow = cards[`${event.target.closest('section').id.split('-')[0]}MainCard`]
//     cardToShow.classList.remove('hide');
//   } else if (event.target.type === 'button') {
//     event.target.closest('.main-card').classList.add('hide');
//     let cardToShow = cards[`${event.target.id}Card`]
//     cardToShow.classList.remove('hide');
//   }
//}
