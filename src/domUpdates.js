let domUpdates = {
  headerDisplay(element, data) {
    element.innerText = `${data}'S `
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
  }


}

export default domUpdates;
