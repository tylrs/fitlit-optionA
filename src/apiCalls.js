export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => console.log("API error"))
};

export const postApiData = (type, data) => {
  let body;
  if (type === 'sleep') {
    body = {
      "userID": data.userId,
      "date": data.todayDate,
      "hoursSlept": data.inputData.hoursSlept,
      "sleepQuality": data.inputData.sleepQuality
    }
  } else if (type === 'hydration') {

  } else if (type === 'activity') {

  }
  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => console.log("Hooray", data))
  .catch(err => console.log("API error"))
}
