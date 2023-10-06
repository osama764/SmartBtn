// configuration of Project
const firebaseConfig = {
  apiKey: "AIzaSyC1pII7CHpUYKDELsSO6QV6AllnIUutCqg",
  authDomain: "smart-home-fb189.firebaseapp.com",
  databaseURL: "https://smart-home-fb189-default-rtdb.firebaseio.com",
  projectId: "smart-home-fb189",
  storageBucket: "smart-home-fb189.appspot.com",
  messagingSenderId: "395648266554",
  appId: "1:395648266554:web:1d9ec392d8c14ca6272003",
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

let description = document.querySelector(".description");

let currentName;
let currentImage;
// Retrieve data from the URL
const urlParams = new URLSearchParams(window.location.search);
//Check for data in URL
if (urlParams.has("nameRoom") && urlParams.has("nameImage")) {
  currentName = decodeURIComponent(urlParams.get("nameRoom"));
  currentImage = decodeURIComponent(urlParams.get("nameImage"));

  //Display data on the page
  document.querySelector(".nameCurrentRoom").innerHTML += currentName;
  description.style.backgroundImage = currentImage;
} else {
  console.log("No user data found in URL");
}

let devices = document.querySelector(".devices");
let devicesPush = document.querySelector(".devicesPush");
let containPushButtons = document.getElementById("containPushButtons");
let NameOfDevice = document.querySelector(".NameOfDevice");
let contentDevices = document.querySelector(".contentDevices");
let addDevice = document.querySelector(".addDevice");
let closecontentdevices = document.querySelector(".closecontentdevices");
let addNewDevice = document.querySelector(".addNewDevice");
let body = document.querySelector("body");
let modal = document.querySelector("modal");





function DisplayDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devices.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          devices.innerHTML = "";

          const devicesArray = childSnapshot.val().devices || [];
          devicesArray.forEach((device, i) => {
            let buttonStyle =
              device.status === "1" ? "btn-success" : "btn-danger";
            let buttonText = device.status === "1" ? "OFF" : "ON";

            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
            <p class="nameOfDevice">${device.Name}</p>
            <img src="images/${device.nameImage}.jpg" alt="">
          
            <div class="container">
              <button class="toggle btn ${buttonStyle}" data-room-key="${childSnapshot.key}" data-device-index="${i}">${buttonText}</button>
              <span style="opacity:0">${device.Name}</span>
            </div>
      
            <span style="opacity:0">${childSnapshot.key}</span>
          </div>`;
            devices.innerHTML += card;
          });
        });

        // Attach click event listeners to the toggle buttons
        let toggleButtons = devices.querySelectorAll(".toggle");
        toggleButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;
            const newStatus = button.textContent === "ON" ? "1" : "0";

            // Get the devices array for the current room
            const devicesArray = snapshot.child(roomKey).val().devices || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;

            
const newImage = imageName
              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devices"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات
            
              updateStateDevice(
                roomKey,
                deviceIndex,
                newStatus,
                newName,
                nameOfArray,
              
                newImage
              );
            }
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}



function DisplayPushDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devicesPush.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          devicesPush.innerHTML = "";
          const devicesArray = childSnapshot.val().devicesPush || [];
          devicesArray.forEach((device, i) => {
            let buttonStylePush =
              device.status === "1" ? "btn-success" : "btn-danger";

            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
            <img src="images/${device.nameImage}.jpg" alt="">
            <p class="nameOfDevice">${device.Name}</p>
          
            <div class="container">
              <button class="push btn ${buttonStylePush}" data-room-key="${childSnapshot.key}" data-device-index="${i}">Push</button>
            </div>

            <span style="opacity:0">${childSnapshot.key}</span>
          </div>`;
            devicesPush.innerHTML += card;
          });
        });

        // Attach click event listeners to the toggle buttons
        let PushButtons = devicesPush.querySelectorAll(".push");
        PushButtons.forEach((button) => {
          button.addEventListener("mousedown", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName

              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
            
                newImage
              );
            }
          });

          button.addEventListener("touchstart", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName
              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(
                roomKey,
                deviceIndex,
                "1",
                newName,
                nameOfArray,
              
                newImage
              );
            }
          });
        });

        PushButtons.forEach((button) => {
          button.addEventListener("mouseup", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName
              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
            
                newImage
              );
            }
          });

          button.addEventListener("touchend", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;

            // Get the devices array for the current room
            const devicesArray =
              snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;
              const imageName = devicesArray[deviceIndex].nameImage;
              const newImage = imageName
              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(
                roomKey,
                deviceIndex,
                "0",
                newName,
                nameOfArray,
            
                newImage
              );
            }
          });
        });

        // استبدل حدث mouseup بـ touchend
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

function updateStateDevice(uid, index, currentStatus, NewName, NameOfArray,newImage) {
  var data = {
    status: currentStatus,
    Name: NewName,
    nameImage:newImage
  };

  $.ajax({
    url: `https://smart-home-fb189-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
    method: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: function () {
      // Hide the clicked button
      const button = devices.querySelector(
        `[data-room-key="${uid}"][data-device-index="${index}"]`
      );
      button.classList.add("hidden");
    },
    error: function () {
      console.error("حدث خطأ أثناء تحديث حالة الجهاز.");
    },
  });
}


window.onload = () => {
  DisplayDevices();
  DisplayPushDevices();
};







