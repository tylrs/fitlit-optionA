// import scripts from  './scripts';
// let headerName = document.querySelector('#header-name');

let domUpdates = {
  cardDisplay(element, data) {
    element.innerText = data;
  },

  trendingDisplay(element, data) {
    element.innerHTML = `<p class='trend-line'>${data}</p>`
  },

  populateArray(element, data) {
    element.forEach((ounce, index) => {
      //console.log(ounce)
      ounce.innerText = data
    })
  }
}

export default domUpdates;

//creating a module
