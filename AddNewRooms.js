// configuration of Project 
const firebaseConfig = {
  apiKey: "AIzaSyC1pII7CHpUYKDELsSO6QV6AllnIUutCqg",
  authDomain: "smart-home-fb189.firebaseapp.com",
  databaseURL: "https://smart-home-fb189-default-rtdb.firebaseio.com",
  projectId: "smart-home-fb189",
  storageBucket: "smart-home-fb189.appspot.com",
  messagingSenderId: "395648266554",
  appId: "1:395648266554:web:1d9ec392d8c14ca6272003"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

// the browser will speech during lading page AddingRoom
function welcomeInRoom() {
  let welcomeMessage = new SpeechSynthesisUtterance(
    "Now you can add new rooms in your smart home"
  );
  let speech = window.speechSynthesis;
  welcomeMessage.rate = 0.7;
  speech.speak(welcomeMessage);
}

// calling function  welcomeInRoom()
window.onload = welcomeInRoom();

let addRoom = document.querySelector(".addRoom");
let contentAddRoom = document.querySelector(".contentAddRoom");
let close = document.querySelector(".close");



// initialization variables to use later

let contentRooms = document.querySelector(".contentRooms");
let body         = document.querySelector("body");



// this function will display all Rooms From RealTime Database 
function DisplayData() {
  $.ajax({
    url: "https://smart-home-fb189-default-rtdb.firebaseio.com/Rooms.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      contentRooms.innerHTML = "";

      for (var room in data) {
        let card = `
          <div  class="card border-0 p-3 m-2 text-center" style="background-image: url(images/${data[room].image}.jpg);">

            <h3 class="mt-3 mb-3 room__title">${data[room].Name}</h3>
            <button class="btn btn-warning  visit">Visit</button>
            <span style="opacity:0">${room}</span> 
          </div>
        `;
        contentRooms.innerHTML += card;
      }
    },
    error: function () {
      alert("Failed to load Data");
    },
  });
}

// calling function display during loading Page
window.onload = DisplayData();

// this is container for all Rooms
contentRooms.addEventListener("click", (e) => {
  
  // the Element that contains classes : ( card  border-0   p-3 m-2   text-center )


  if (e.target.classList == "btn btn-warning  visit") {

    // Fetching room data via this current element on which the event takes place
    const nameImage = e.target.parentElement.style.backgroundImage
    const nameRoom =
    e.target.parentElement.lastElementChild.previousElementSibling.previousElementSibling
    .innerHTML

    // Encrypt the data and send it to the home page in the url
    const encodedImage = encodeURIComponent(nameImage);
    const encodedName = encodeURIComponent(nameRoom);
    // path Home Page
    const url = 
      "ShowMyRooms.html?nameRoom=" +
      encodedName +
      "&nameImage=" +
      encodedImage;
    window.location.href = url;
  }





})

