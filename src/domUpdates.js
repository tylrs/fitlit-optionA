//Query Selectors

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


//Event Listeners

window.addEventListener('load', fetchData);

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDOM);
stepsTrendingButton.addEventListener('click', updateTrendingStepsDOM);

//Event Handlers

export default domUpdates;
