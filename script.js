const inpFile = document.getElementById("inpFile")
const previewContainer = document.getElementById("docPreview")
const previewDoc = previewContainer.querySelector(".doc-preview__doc")
const previewDefaultText = previewContainer.querySelector(".doc-preview__default-text")
var firstClick = 0;
var secondClick = 0;
var firstClickX = 0;
var firstClickY = 0;
var secondClickX = 0;
var secondClickY = 0;
var coordArray = [];
saveBtn = document.getElementById("saveBtn");

inpFile.addEventListener("change", function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
  
  reader.addEventListener("load", function() {
    previewDoc.setAttribute("src",this.result);
  });

  reader.readAsDataURL(file);

  }
});

//The purpose of this function is to:
//1. Get the coordinates of the mouse click.
// handle click function 
// if shift key is pressed save second set of coordinates
// if shift is not pressed save first set of coordinates
function handleClick(event) {
  if (event.shiftKey) {
    event.offsetX = [];
    event.offsetY = [];
    firstClickX = event.offsetX[0];
    secondClickX = event.offsetY[1];
    firstClickY = event.offsetY[0];
    secondClickY = event.offsetY[1];
    saveCoords();
  } else {
    firstClickX = event.offsetX;
    firstClickY = event.offsetY;
  }
}

//function get global coordinates returns 2 set of coordinates
function getGlobalCoordinates() {
  return [firstClickX, firstClickY, secondClickX, secondClickY];
}
  
// function calculates width and height, given 2 sets of coordinates
// it calculates the distance between the two points as width and height
// inputs: x1,y1,x2,y2
// outputs: width, height
function calculateWidthAndHeight (getGlobalCoordinates) {
  var x1 = getGlobalCoordinates[0];
  var y1 = getGlobalCoordinates[1];
  var x2 = getGlobalCoordinates[2];
  var y2 = getGlobalCoordinates[3];
  var width = x2 - x1;
  var height = y2 - y1;
  return [width, height];
}


// function button to save coordinates, width and height to a json file
// takes first set of coordinates, second set, width and height
// and the "field_name" input field as the key stores the data
// in the in-memory-array called "coordArray" which is a global variable
// clear local storage of any saved files when user clicks the button
function saveCoords() {
  var getGlobal = getGlobalCoordinates();
  var widthAndHeight = calculateWidthAndHeight(getGlobal);
  var width = widthAndHeight[0];
  var height = widthAndHeight[1]; 
  var input_field = ({"field": "",
                      "width": width, 
                      "height": height, 
                      "x": getGlobal[0], 
                      "y": getGlobal[1], 
                      "x2": getGlobal[2], 
                      "y2": getGlobal[3]});
  document.getElementById("x1").innerHTML = getGlobal[0];
  document.getElementById("y1").innerHTML = getGlobal[1];
  document.getElementById("x2").innerHTML = getGlobal[2];
  document.getElementById("y2").innerHTML = getGlobal[3];
  document.getElementById("width").innerHTML = width;
  document.getElementById("height").innerHTML = height;
  //saveBtn.addEventListener("click", function() {
  coordArray.push(input_field);
  localStorage.setItem("coordArray", JSON.stringify(coordArray));
  //alert("Coordinates saved!");
  // }); 
  //Clear x1,y1,x2,y2,width,height from the page
  document.getElementById("x1").innerHTML = "";
  document.getElementById("y1").innerHTML = "";
  document.getElementById("x2").innerHTML = "";
  document.getElementById("y2").innerHTML = "";
  document.getElementById("width").innerHTML = "";
  document.getElementById("height").innerHTML = "";
  //Clear the preview image
  previewDoc.setAttribute("src", "");
  //Clear the input field
  inpFile.value = "";
  
}
  

function clearLocalStorage() {
  localStorage.clear(coordArray);
}

//showjson the purpose of this function is to show a popup with a 
// textarea where we can copy the json data from the coordArray in-memory array
// the popup has a close button
function showjson() {
  var coordArray = JSON.parse(localStorage.getItem("coordArray"));
  var text = JSON.stringify(coordArray, null, 2);
  var popup = document.getElementById("popup");
  var popupText = document.getElementById("popupText");
  popupText.innerHTML = text;
  popup.style.display = "block";
}




