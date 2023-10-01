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
let devicesPush = document.querySelector(".devicesPush");
let containPushButtons = document.getElementById("containPushButtons");
let NameOfDevice = document.querySelector(".NameOfDevice");
let contentDevices = document.querySelector(".contentDevices");
let addDevice = document.querySelector(".addDevice");
let closecontentdevices = document.querySelector(".closecontentdevices");
let addNewDevice = document.querySelector(".addNewDevice");
let body = document.querySelector("body");
let modal = document.querySelector("modal");

// button open Form add New Device in this Room
addDevice.addEventListener("click", () => {
  contentDevices.style.transform = "scale(1)";
});

// button close Form
closecontentdevices.addEventListener("click", () => {
  contentDevices.style.transform = "scale(0)";
});

addNewDevice.addEventListener("click", () => {
  // close form after adding new device
  contentDevices.style.transform = "scale(0)";

  // Call data from realtime
  let roomsRef = firebase.database().ref("Rooms");
  // if checkbox not Checked ====> : Normal device without bushing

  if (!containPushButtons.checked) {
    roomsRef
      .orderByChild("Name")
      .equalTo(currentName)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const devicesArray = childSnapshot.val().devices || [];
          const newDevice = {
            Name: currentName+NameOfDevice.value,
            status: 0,
          };
          const deviceExists = devicesArray.some(
            (device) => device.Name === newDevice.Name
          );
          if (deviceExists) {
            // this message will speech after adding New Device in Room
            let welcomeMessage = new SpeechSynthesisUtterance(
              "This device already exists"
            );
            let speech = window.speechSynthesis;
            welcomeMessage.rate = 0.7;
            speech.speak(welcomeMessage);
            alert("This device already exists");

          } else {
            devicesArray.push(newDevice);
            childSnapshot.ref.update({ devices: devicesArray }).then(() => {
              console.log("تم إضافة الجهاز بنجاح!");
              // this message will speech after adding New Device in Room
              let welcomeMessage = new SpeechSynthesisUtterance(
                "A new device has been added to the room"
              );
              let speech = window.speechSynthesis;
              welcomeMessage.rate = 0.7;
              speech.speak(welcomeMessage);
            });
          }
        });
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
      });

      
  } else {
    roomsRef
      .orderByChild("Name")
      .equalTo(currentName)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const devicesArray = childSnapshot.val().devicesPush || [];
          const newDevice = {
            Name: currentName+"Push"+NameOfDevice.value,
            status: 0,
          };
          const deviceExists = devicesArray.some(
            (device) => device.Name === newDevice.Name
          );
          if (deviceExists) {
          // this message will speech after adding New Device in Room
          let welcomeMessage = new SpeechSynthesisUtterance(
            "This device already exists"
          );
          let speech = window.speechSynthesis;
          welcomeMessage.rate = 0.7;
          speech.speak(welcomeMessage);
          alert("This device already exists");
          } else {
            devicesArray.push(newDevice);
            childSnapshot.ref.update({ devicesPush: devicesArray }).then(() => {
              console.log("تم إضافة الجهاز بنجاح!");
                // this message will speech after adding New Device in Room
                let welcomeMessage = new SpeechSynthesisUtterance(
                  "A new device has been added to the room"
                );
                let speech = window.speechSynthesis;
                welcomeMessage.rate = 0.7;
                speech.speak(welcomeMessage);
            });
          }
        });
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء إضافة الجهاز الجديد:", error);
      });


  }

});

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
//             <i class="fa-solid fa-trash-can deletbtnDevice"></i>
            
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
            let buttonStyle = device.status === "1" ? "btn-success" : "btn-danger";
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

function DisplayPushDevices() {
  const roomsRef = firebase.database().ref("Rooms");
  roomsRef
    .orderByChild("Name")
    .equalTo(currentName)
    .on(
      "value",
      (snapshot) => {
        devicesPush.innerHTML=""
        snapshot.forEach((childSnapshot) => {
          devicesPush.innerHTML=""
          const devicesArray = childSnapshot.val().devicesPush || [];
          devicesArray.forEach((device, i) => {
            
            let buttonStylePush = device.status === "1" ? "btn-success" : "btn-danger";
    
            let card = `<div class="card border-0 p-2">
            <span style="opacity:0">${i}</span>
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
            const devicesArray = snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;

              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(roomKey, deviceIndex, "1", newName, nameOfArray, deviceName);
            }
          });

          button.addEventListener("touchstart", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;
          
            // Get the devices array for the current room
            const devicesArray = snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;

              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(roomKey, deviceIndex, "1", newName, nameOfArray, deviceName);
            }
          });
        });

        PushButtons.forEach((button) => {
          button.addEventListener("mouseup", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;
        
            // Get the devices array for the current room
            const devicesArray = snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;

              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(roomKey, deviceIndex, "0", newName, nameOfArray, deviceName);
            }
          });

          button.addEventListener("touchend", () => {
            const roomKey = button.dataset.roomKey;
            const deviceIndex = button.dataset.deviceIndex;
        
            // Get the devices array for the current room
            const devicesArray = snapshot.child(roomKey).val().devicesPush || [];

            // Check if the deviceIndex is within the valid range
            if (deviceIndex >= 0 && deviceIndex < devicesArray.length) {
              // Get the name of the device
              const deviceName = devicesArray[deviceIndex].Name;

              const newName = deviceName; // اضف هنا اسمًا جديدًا إذا كنت ترغب في تغيير اسم الجهاز
              const nameOfArray = "devicesPush"; // اضف هنا اسم الصفيف الذي يحتوي على الأجهزة في قاعدة البيانات

              updateStateDevice(roomKey, deviceIndex, "0", newName, nameOfArray, deviceName);
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
// caling two functions during load Page
window.onload = () => {
  DisplayDevices();
  DisplayPushDevices();
}




