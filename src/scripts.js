import './sass/index.scss';
import domUpdates from './domUpdates';
import { fetchApiData, postApiData } from './apiCalls';
import UserRepository from './UserRepository';
import User from './User';

let todayDate = "2019/09/12";
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
// let activityFormCard = document.querySelector('#activity-form-card');
let stepsFormCard = document.querySelector('#steps-form-card');

// let hydrationFormMessage = document.querySelector('.hydration-form h3');
// let sleepFormMessage = document.querySelector('.sleep-form h3');
// let activityFormMessage = document.querySelector('.activity-form h3');
let hydrationFormMessage = document.querySelector('.hydration-form h2');
let sleepFormMessage = document.querySelector('.sleep-form h2');
let activityFormMessage = document.querySelector('.activity-form h2');

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
  ariaStateChange()
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
// profileButton.addEventListener('click', showDropdown);

//aria function below
function ariaStateChange() {
  let attribute = profileButton.getAttribute("aria-expanded");
  if (attribute === 'true') {
   profileButton.setAttribute("aria-expanded", false);
 } else {
   profileButton.setAttribute("aria-expanded", true);
 }
}

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

function showPostMessage(type, status, responseStatus) {
  let messageSelectors = {
    hydrationFormMessage,
    sleepFormMessage,
    activityFormMessage
  }
  domUpdates.facilitatePostMessage(type, status, responseStatus, messageSelectors, user)
}

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
  userRepository = new UserRepository(usersData, sleepData, activityData, hydrationData);

  userRepository.updateUsersSleep();
  userRepository.updateUsersActivity();
  userRepository.updateUsersHydration();
  user = userRepository.users[0];
  user.findTrendingStepDays();
  user.findTrendingStairsDays();
  user.findFriendsNames(userRepository.users);
}

function populateDOM() {
  populateUserCard()
  populateStepCard()
  populateClimbedCard()
  populateHydrationCard()
  populateSleepCard()
}

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
  return found;
}

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

function populateIterateCard(queries, finds) {
  queries.forEach((query, queryIndex) => {
    finds.forEach((find, findIndex) => {
      if (queryIndex === findIndex) {
        domUpdates.cardDisplay(query, find)
      }
    })
  })
}

//Individual Card functions
function populateStepCard() {
  populateMainCard(stepsUserStepsToday, findData(activityData, "numSteps"))
  populateIterateCard([stepsInfoActiveMinutesToday, stepsInfoMilesWalkedToday], [findData(activityData, "minutesActive"), user.calculateMiles(todayDate)])
  populateIterateCard([stepsFriendActiveMinutesAverageToday, stepsFriendStepsAverageToday, stepsFriendAverageStepGoal], [userRepository.calculateAverage(todayDate, "minutesActive"), userRepository.calculateAverage(todayDate, "steps"), `${userRepository.calculateAverageStepGoal()}`]);
  populateIterateCard([stepsCalendarTotalActiveMinutesWeekly, stepsCalendarTotalStepsWeekly], [user.calculateAverageMinutesActiveThisWeek(todayDate), user.calculateAverageStepsThisWeek(todayDate)]);
}

function populateClimbedCard() {
  populateMainCard(stairsUserStairsToday, (findData(activityData, "flightsOfStairs") * 12))
  populateIterateCard([stairsInfoFlightsToday], [findData(activityData, "flightsOfStairs")])
  populateIterateCard([stairsFriendFlightsAverageToday], [userRepository.calculateAverage(todayDate, "flightsOfStairs").toFixed(1)])
  populateIterateCard([stairsCalendarFlightsAverageWeekly, stairsCalendarStairsAverageWeekly], [user.calculateAverageFlightsThisWeek(todayDate), (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0)]);
}

function populateHydrationCard() {
  populateMainCard(hydrationUserOuncesToday, findData(hydrationData, "numOunces"));
  populateIterateCard([hydrationInfoGlassesToday], [(findData(hydrationData, "numOunces") / 8).toFixed(1)])
  populateIterateCard([hydrationFriendOuncesToday], [userRepository.calculateAverageDailyWater(todayDate)]);

  let sortedHydrationDataLastWeek = user.ouncesRecord.filter((currentRecord) => {
    let index = user.ouncesRecord.indexOf(user.ouncesRecord.find(record => Object.keys(record)[0] === todayDate));
    index += 1;
    return (index <= user.ouncesRecord.indexOf(currentRecord) && user.ouncesRecord.indexOf(currentRecord) <= (index + 6))
  })
  domUpdates.populateTextArray(dailyOz, sortedHydrationDataLastWeek, user)
}

function populateSleepCard() {
  populateMainCard(sleepUserHoursToday, findData(sleepData, "hoursSlept"));
  populateIterateCard([sleepInfoQualityToday, sleepInfoHoursAverageAlltime, sleepInfoQualityAverageAlltime], [findData(sleepData, "sleepQuality"), user.hoursSleptAverage, user.sleepQualityAverage]);
  populateIterateCard([sleepFriendLongestSleeper, sleepFriendWorstSleeper], [findSleeper("best"), findSleeper("worst")]);
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
    // activityFormCard
    stepsFormCard
  }
  domUpdates.facilitateCardChange(event, cards)
}
