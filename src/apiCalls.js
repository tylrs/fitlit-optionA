export const fetchApiData = (type) => {
  return fetch(`http://localhost:8000/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => console.log("API error"))
};