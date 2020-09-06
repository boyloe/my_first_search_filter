console.log("JavaScript loaded");

const searchParams = new URLSearchParams(window.location.search)
const nameSearch = searchParams.get('search')
const ageSearch = searchParams.get('age')


const baseURL = "http://localhost:3000";
let dogsURL = `${baseURL}/dogs`;

if(nameSearch || ageSearch) {
  dogsURL = `${dogsURL}?nameSearch=${nameSearch}&ageSearch=${ageSearch}`;
}
const dogsSection = document.querySelector("section");

fetch(dogsURL)
  .then(parseJSON)
  .then(displayDogs);

function displayDogs(dogs) {
  if (dogs.length > 0){
  dogs.forEach(showDog);
  }else{
    const noDog = document.createElement('p')
    noDog.textContent = "I can't find any dogs that match!"
    document.body.append(noDog)
  }
}

function showDog(dog) {
  const dogCard = document.createElement("div");
  
  const name = document.createElement("h2");
  name.textContent = dog.name; 
  
  const age = document.createElement("p");
  age.textContent = `${dog.age} years old`;

  dogCard.append(name, age);
  dogsSection.append(dogCard);
}

function parseJSON(response) {
  return response.json();
}