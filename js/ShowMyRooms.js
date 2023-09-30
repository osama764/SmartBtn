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
let containPushButtons = document.getElementById("containPushButtons");
let NameOfDevice = document.querySelector(".NameOfDevice");
let contentDevices = document.querySelector(".contentDevices");
let addDevice = document.querySelector(".addDevice");
let closecontentdevices = document.querySelector(".closecontentdevices");
let addNewDevice = document.querySelector(".addNewDevice");
let body = document.querySelector("body");
let modal = document.querySelector("modal");



// View stored data from realtime Database ( Normal devices without bushing )
// function DisplayDevices() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devices.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           const devicesArray = childSnapshot.val().devices || [];
//           devicesArray.forEach((device, i) => {
//             let card = `<div class="card border-0 p-2">
//             <span style="opacity:0">${i}</span>
//             <p class="nameOfDevice">${device.Name}</p>

            
//             <div class="container">
//               <button class="on btn btn-primary">ON</button>
//               <button class="off btn btn-danger">OFF</button>


//               <span style="opacity:0">${device.Name}</span>
//             </div>
      
//             <span style="opacity:0">${childSnapshot.key}</span>
//           </div>`;
//             devices.innerHTML += card;
//           });
//         });
//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );
// }


// function DisplayDevices() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devices.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           const devicesArray = childSnapshot.val().devices || [];
//           devicesArray.forEach((device, i) => {
//             let onButtonStyle = device.status === "1" ? "opacity: 0;" : "";
//             let offButtonStyle = device.status === "0" ? "opacity: 0;" : "";

//             let card = `<div class="card border-0 p-2">
//             <span style="opacity:0">${i}</span>
//             <p class="nameOfDevice">${device.Name}</p>

            
//             <div class="container">
//               <button class="on btn btn-primary" style="${onButtonStyle}">ON</button>
//               <button class="off btn btn-danger" style="${offButtonStyle}">OFF</button>


//               <span style="opacity:0">${device.Name}</span>
//             </div>
      
//             <span style="opacity:0">${childSnapshot.key}</span>
//           </div>`;
//             devices.innerHTML += card;

//             // Attach click event listeners to the buttons
//             const cardElement = devices.lastElementChild;
//             const onButton = cardElement.querySelector(".on");
//             const offButton = cardElement.querySelector(".off");

//             onButton.addEventListener("click", () => {
//               updateDeviceStatus(childSnapshot.key, i, "1");
//             });

//             offButton.addEventListener("click", () => {
//               updateDeviceStatus(childSnapshot.key, i, "0");
//             });
//           });
//         });
//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );
// }

// function updateDeviceStatus(roomKey, deviceIndex, newStatus) {
//   const devicesRef = firebase.database().ref(`Rooms/${roomKey}/devices`);
//   devicesRef.child(deviceIndex).update({ status: newStatus });
// }
// function DisplayDevices() {
//   const roomsRef = firebase.database().ref("Rooms");
//   roomsRef
//     .orderByChild("Name")
//     .equalTo(currentName)
//     .on(
//       "value",
//       (snapshot) => {
//         devices.innerHTML = "";
//         snapshot.forEach((childSnapshot) => {
//           const devicesArray = childSnapshot.val().devices || [];
//           devicesArray.forEach((device, i) => {
//             let buttonStyle = device.status === "1" ? "btn-danger" : "btn-primary";
//             let buttonText = device.status === "1" ? "OFF" : "ON";

//             let card = `<div class="card border-0 p-2">
//             <span style="opacity:0">${i}</span>
//             <p class="nameOfDevice">${device.Name}</p>

//             <div class="container">
//               <button class="toggle btn ${buttonStyle}" data-room-key="${childSnapshot.key}" data-device-index="${i}">${buttonText}</button>
//               <span style="opacity:0">${device.Name}</span>
//             </div>
      
//             <span style="opacity:0">${childSnapshot.key}</span>
//           </div>`;
//             devices.innerHTML += card;
//           });
//         });

//         // Attach click event listeners to the toggle buttons
//         const toggleButtons = devices.querySelectorAll(".toggle");
//         toggleButtons.forEach((button) => {
//           button.addEventListener("click", () => {
//             const roomKey = button.dataset.roomKey;
//             const deviceIndex = button.dataset.deviceIndex;
//             const newStatus = button.textContent === "ON" ? "1" : "0";
        
//             // Get the devices array for the current room
//             const devicesArray = snapshot.child(roomKey).val().devices || [];
        
//             // Check if the deviceIndex is within the valid range
//             if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
//               // Get the name of the device
//               const deviceName = devicesArray[deviceIndex].Name;
        
//               const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
//               const nameOfArray = "devices"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات
        
//               updateStateDevice(roomKey, deviceIndex, newStatus, newName, nameOfArray, deviceName);
//             }
//           });
//         });
//       },
//       (error) => {
//         console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
//       }
//     );
// }

// function updateStateDevice(uid, index, currentStatus, NewName, NameOfArray) {
//   var data = {
//     status: currentStatus,
//     Name: NewName,
//   };

//   $.ajax({
//     url: `https://smart-home-fb189-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
//     method: "PUT",
//     data: JSON.stringify(data),
//     contentType: "application/json; charset=UTF-8",
//     dataType: "json",
//     success: function () {
//       // Hide the clicked button
//       const button = devices.querySelector(`[data-room-key="${uid}"][data-device-index="${index}"]`);
//       button.style.display = "none";
//     },
//     error: function () {
//       console.error("حدث خطأ أثناء تحديث حالة الجهاز.");
//     },
//   });
// }

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
          const devicesArray = childSnapshot.val().devices || [];
          devicesArray.forEach((device, i) => {
            let buttonStyle = device.status === "1" ? "btn-danger" : "btn-primary";
            let buttonText = device.status === "1" ? "OFF" : "ON";

            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
            <p class="nameOfDevice">${device.Name}</p>

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
        const toggleButtons = devices.querySelectorAll(".toggle");
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
        
              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devices"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات
        
              updateStateDevice(roomKey, deviceIndex, newStatus, newName, nameOfArray, deviceName);
            }
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}

function updateStateDevice(uid, index, currentStatus, NewName, NameOfArray) {
  var data = {
    status: currentStatus,
    Name: NewName,
  };

  $.ajax({
    url: `https://smart-home-fb189-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
    method: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: function () {
      // Hide the clicked button
      const button = devices.querySelector(`[data-room-key="${uid}"][data-device-index="${index}"]`);
      button.classList.add("hidden");
    },
    error: function () {
      console.error("حدث خطأ أثناء تحديث حالة الجهاز.");
    },
  });
}
// View stored data from realtime Database (  devices  bushing )
function DisplayPushDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const devicesArray = childSnapshot.val().devicesPush || [];
          devicesArray.forEach((device, i) => {
            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
            <p class="nameOfDevice">${device.Name}</p>

            <div class="container">
              <button class="push btn btn-primary">Push</button>
            </div>
      
            <span style="opacity:0">${childSnapshot.key}</span>
          </div>`;
            devices.innerHTML += card;
          });
        });
      },
      (error) => {
        console.error("حدث خطأ أثناء قراءة الأجهزة:", error);
      }
    );
}
// caling two functions during load Page
window.onload = () => {
  DisplayDevices();
  DisplayPushDevices();
};

// initialization of two variables to store index and name of device

let index;
let newNameOfDevice;

// container all Devices
// devices.addEventListener("click", (e) => {
//   // index and uid :==> (id) and name of current Device to use later during updating
//   let uid = e.target.parentElement.parentElement.lastElementChild.innerHTML;
//   index = e.target.parentElement.parentElement.firstElementChild.innerHTML;

//   // the Element that contains classes : ( chekinput ) and checked will be updated
//   if (e.target.classList == "on btn btn-primary") {
//     newNameOfDevice =
//       e.target.parentElement.parentElement.firstElementChild.nextElementSibling
//         .innerHTML;
//     updateStateDevice(uid, index, "1", newNameOfDevice, "devices");
//     e.target.nextElementSibling.style.opacity="1"
//     e.target.style.opacity="0"

//   }
//   if (e.target.classList == "off btn btn-danger") {
//     newNameOfDevice =
//       e.target.parentElement.parentElement.firstElementChild.nextElementSibling
//         .innerHTML;
//         e.target.previousElementSibling.style.opacity="1"
//     e.target.style.opacity="0"

//     updateStateDevice(uid, index, "0", newNameOfDevice, "devices");
  
//   }
//   // uid and index for this current element
//   uid = e.target.parentElement.lastElementChild.innerHTML;
//   index = e.target.parentElement.firstElementChild.innerHTML;

// });

// // function updateStateDevice device using index and uid



// function updateStateDevice(uid, index, currentStatus, NewName, NameOfArray) {
//   var data = {
//     status: currentStatus,
//     Name: NewName,
//   };

//   $.ajax({
//     url: `https://smart-home-fb189-default-rtdb.firebaseio.com/Rooms/${uid}/${NameOfArray}/${index}.json`,
//     method: "PUT",
//     data: JSON.stringify(data),
//     contentType: "application/json; charset=UTF-8",
//     dataType: "json",
//     success: function () {},
//     error: function () {},
//   });
// }


devices.addEventListener("mousedown", (e) => {
  let uid = e.target.parentElement.parentElement.lastElementChild.innerHTML;
  index = e.target.parentElement.parentElement.firstElementChild.innerHTML;

  // the Element that contains classes : ( chekinput ) and checked will be updated
  if (e.target.classList == "push btn btn-primary") {
    newNameOfDevice =
      e.target.parentElement.parentElement.firstElementChild.nextElementSibling
        .innerHTML;
    updateStateDevice(uid, index, "1", newNameOfDevice, "devicesPush");

  }
});

devices.addEventListener("mouseup", (e) => {
  let uid = e.target.parentElement.parentElement.lastElementChild.innerHTML;
  index = e.target.parentElement.parentElement.firstElementChild.innerHTML;

  if (e.target.classList == "push btn btn-primary") {
    newNameOfDevice =
      e.target.parentElement.parentElement.firstElementChild.nextElementSibling
        .innerHTML;
    updateStateDevice(uid, index, "0", newNameOfDevice, "devicesPush");


  }
});



