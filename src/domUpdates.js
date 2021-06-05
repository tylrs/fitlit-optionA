// import scripts from  './scripts';
// let headerName = document.querySelector('#header-name');

let domUpdates = {
  cardDisplay(element, data) {
    element.innerText = data;
  },

  trendingDisplay(element, data) {
    element.innerHTML = `<p class='trend-line'>${data}</p>`
  },
}

export default domUpdates;

//creating a module
