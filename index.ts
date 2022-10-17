fetch(`/.netlify/functions/fetch-weather?lat=48.8566&long=2.3522&lang=fr`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

export {};
