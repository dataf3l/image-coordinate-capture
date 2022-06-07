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
  } else {
    firstClickX = event.offsetX;
    firstClickY = event.offsetY;
  }
}

//function get global coordinates returns 2 set of coordinates
function getGlobalCoordinates(handleClick) {
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
// and the value of the "field_name" input field and stores the data
// in the in-memory-array called "coorArray"
function


//showjson the purpose of this function is to show a popup with a 
// textarea where we can copy the json data from the coordArray in-memory array
// the popup has a close button




function showCoords(event) {
  //1
  var x = event.offsetX;
  var y = event.offsetY;
  document.getElementById("x").innerHTML = x;
  document.getElementById("y").innerHTML = y;


  //2
  var height = y.firstClick - y.secondClick;
  var width = x.firstClick - x.secondClick;


  document.getElementById("h").innerHTML = height;
  document.getElementById("w").innerHTML = width;

  // addField
  var coor = {"height": height, "width": width, "x": x, "y": y};
  var coorArray = [];
  coorArray.push(coor);

  // showjson
  // var coorJSON = JSON.stringify(coorArray);
  // var blob = new Blob([coorJSON], {type: "application/json"});
  // var url = URL.createObjectURL(blob);
  // document.getElementById("download").href = url;
  // document.getElementById("download").download = "coordinates.json";
}

