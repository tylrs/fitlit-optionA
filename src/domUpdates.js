let domUpdates = {
  headerDisplay(element, data) {
    element.innerText = `${data}'S `
  },

  emailDisplay(element, data) {
    element.innerText = `EMAIL | ${data}`
  },

  cardDisplay(element, data) {
    element.innerText = data;
  },

  trendingDisplay(element, data) {
    element.innerHTML = `<p class='trend-line'>${data}</p>`
  },

  showDropdown(element) {
    element.classList.toggle('hide');
  },

  applyFriendStyling() {
    let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
    friendsStepsParagraphs.forEach(paragraph => {
      if (friendsStepsParagraphs[0] === paragraph) {
        paragraph.classList.add('green-text');
      }
      if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
        paragraph.classList.add('red-text');
      }
      if (paragraph.innerText.includes('YOU')) {
        paragraph.classList.add('yellow-text');
      }
    });
  },

  populateDropDown(element, data, collectiveData) {
    element.innerHTML = `DAILY STEP GOAL | ${data.dailyStepGoal}
    <br>average step goal amongst all users | ${collectiveData.calculateAverageStepGoal()}
    <br>your goal/average of all users goal | ${((data.dailyStepGoal / collectiveData.calculateAverageStepGoal()) * 100).toFixed(0)}%`;
  },

  populateAdditionalInfo(element, user) {
    element.innerHTML = `Your ID: ${user.id}<br>Your Addy: ${user.address}<br>Your Stride Length: ${user.strideLength}<br>`
  },
  //refactor to make more dynamic?
  populateTextArray(element, data, user) {
    element.forEach((ounce, index) => {
      ounce.innerText = user.addDailyOunces(Object.keys(data[index])[0])
    })
  },

  populateHTMLArray(array, location) {
    array.forEach(element => {
      location.innerHTML += `
      <p class='dropdown-p friends-steps'>${element.firstName} |  ${element.totalWeeklySteps}</p>
      `;
    });
  },

  facilitateCardChange(event, cards) {
    if (event.target.classList.contains('go-back-button')) {
      event.target.closest('section').classList.add('hide');
      let cardToShow = cards[`${event.target.closest('section').id.split('-')[0]}MainCard`]
      cardToShow.classList.remove('hide');
    } else if (event.target.type === 'button') {
      event.target.closest('.main-card').classList.add('hide');
      let cardToShow = cards[`${event.target.id}Card`]
      cardToShow.classList.remove('hide');
    }
  },

  // determineShoworSubmit(event) {
  //   event.preventDefault()
  //   if (event.target.classList.contains('new-data-submit-button')) {
  //     sortForm(event);
  //   } else {
  //     showInfo(event);
  //   }
  // },

  // determinePostData(event, inputFields) {
  //   let inputData, type;
  //   if (event.target.id === 'sleepSubmitButton') {
  //     let hoursSleptInput = parseInt(hoursSleptUserInput.value);
  //     let sleepQualityInput = parseInt(sleepQualityUserInput.value);
  //     inputData = {hoursSleptInput, sleepQualityInput};
  //     type = 'sleep';
  //   } else if (event.target.id === 'hydrationSubmitButton') {
  //     let numOuncesInput = parseInt(numOuncesUserInput.value);
  //     inputData = {numOuncesInput};
  //     type = 'hydration';
  //   } else if (event.target.id === 'activitySubmitButton') {
  //     let numStepsInput = parseInt(numStepsUserInput.value);
  //     let minutesActiveInput = parseInt(minutesActiveUserInput.value);
  //     let flightsOfStairsInput = parseInt(flightsOfStairsUserInput.value);
  //     inputData = {numStepsInput, minutesActiveInput, flightsOfStairsInput};
  //     type = 'activity';
  //   }
  //   postData(type, inputData)
  // },

  facilitatePostMessage(type, status, responseStatus, messageSelectors, user) {
    let newMessage;
    let originalMessage = messageSelectors[`${type}FormMessage`].innerText;
    if (status === 'success') {
      newMessage = `DATA RECEIVED! THANK YOU FOR SUBMITTING ${user.getFirstName()}.`;
    } else {
      newMessage = `Sorry ${user.getFirstName()}, there was an ${responseStatus.message}`;
    }
    messageSelectors[`${type}FormMessage`].innerText = newMessage;
    const resetMessage = setTimeout(() => {
      messageSelectors[`${type}FormMessage`].innerText = originalMessage;
    }, 5000)
  }


}

export default domUpdates;
