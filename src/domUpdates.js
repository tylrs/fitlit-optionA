// import scripts from  './scripts';
// let headerName = document.querySelector('#header-name');

let domUpdates = {
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
  //refactor this bad boi to work
  populateTextArray(element, data) {
    element.forEach((ounce, index) => {
      //console.log(ounce)
      ounce.innerText = data
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

//creating a module
