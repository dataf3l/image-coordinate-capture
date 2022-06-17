const inpFile = document.getElementById("inpFile")
const previewContainer = document.getElementById("docPreview")
const previewDoc = previewContainer.querySelector(".doc-preview__doc")
const previewDefaultText = previewContainer.querySelector(".doc-preview__default-text")


var firstClickX = 0;
var firstClickY = 0;

var secondClickX = 0;
var secondClickY = 0;

var coordArray = [];


var STATE_NOTHING_CLICK = 0;
var STATE_FIRST_CLICK = 1;
var STATE_SECOND_CLICK = 2;

var global_state = STATE_NOTHING_CLICK;
function set_state(state){
  global_state = state;
}
function get_state(){
  return global_state;
}

saveBtn = document.getElementById("saveBtn");

inpFile.addEventListener("change", function() {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
  
  reader.addEventListener("load", function() {
    previewDoc.setAttribute("src",this.result);
    // focus on the field_name field
    document.getElementById("field_name").focus();
  });

  reader.readAsDataURL(file);

  }
});

/* Change the dimensions of the canvas object with id renderArea to be
the same as the dimensions of the parameter
*/
function resizeCanvas(imgObj){
  var canvas = document.getElementById("renderArea");
  canvas.width = imgObj.width;
  canvas.height = imgObj.height;
}

function clearForm(){
  set_value("x1", '');
  set_value("y1", '');
  set_value("field_name", '');
  set_value("width", '');
  set_value("height", '');
  // * page number and broker id are not cleared intentionally
}

function updateFormWithCoords(event){
  var s = get_state();
  if(s == STATE_NOTHING_CLICK){
    set_value("x1", event.offsetX);
    set_value("y1", event.offsetY);
    
  }
  if(s == STATE_FIRST_CLICK){
    var ctx = getContext();
    var w = event.offsetX - firstClickX;
    var h = event.offsetY - firstClickY;
    if (event.shiftKey || event.altKey || event.ctrlKey) { 
      drawPreviewRectangle(ctx,firstClickX, firstClickY, w, h,"rgba(0,0,0,0.5)");
    }
    set_value("width", event.offsetX - firstClickX);
    set_value("height", event.offsetY - firstClickY);
  }
  if(s == STATE_SECOND_CLICK){// purple
    drawPreviewRectangle(ctx,firstClickX, firstClickY, w, h,"rgba(1,0,1,0.5)");
    
    // show the red square on the canvas
  }
}

function getContext(){
  var canvas = document.getElementById("renderArea");
  var ctx = canvas.getContext("2d");
  return ctx;
}

function getCanvasDimensions(){
  var canvas = document.getElementById("renderArea");
  var w = canvas.width;
  var h = canvas.height;
  return {w:w, h:h};
}
// default should be "rgba(0,0,0,0.5)"
function drawPreviewRectangle(ctx,x,y,width,height, color){
  var canvasDimensions = getCanvasDimensions();
  ctx.clearRect(0, 0, canvasDimensions.w, canvasDimensions.h);
  ctx.fillStyle = color;
  ctx.fillRect(x,y,width,height);
}

// should be called every time we change the state
function render(){
  // get the 2d context object from the canvas element with id renderArea
  var canvas = document.getElementById("renderArea");
  var ctx = canvas.getContext("2d");
  // clear the canvas completely
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var s = get_state();
  if (s == STATE_FIRST_CLICK){
    // show a 2x2 small red square at the first click position
    ctx.fillStyle = "red";
    ctx.fillRect(firstClickX, firstClickY, 2, 2);
  }
  if (s == STATE_SECOND_CLICK){
    // draw a transparent rectangle between the first and second click positions
    drawPreviewRectangle(ctx,firstClickX, firstClickY, secondClickX - firstClickX, secondClickY - firstClickY, "rgba(0,0,0,0.5)");
  }
}

//The purpose of this function is to:
//1. Get the coordinates of the mouse click.
// handle click function 
// if shift key is pressed save second set of coordinates
// if shift is not pressed save first set of coordinates

function handleClick(event) {


  if (event.shiftKey || event.altKey || event.ctrlKey) { 
    if(get_state() != STATE_FIRST_CLICK){
      return;
    }
    // if the field_name is empty, do nothing 
    if(document.getElementById("field_name").value == ""){
      document.getElementById("field_name").style.backgroundColor = "rgb(255,200,200)";
      document.getElementById("field_name").focus();
      render();
      return;
    }
    


    secondClickX = event.offsetX;
    secondClickY = event.offsetY;

    // fix coords if x2 is left of x1
    if(secondClickX < firstClickX){
      var temp = secondClickX;
      secondClickX = firstClickX;
      firstClickX = temp;
    }
    // fix coords if y2 is above y1
    if(secondClickY < firstClickY){
      var temp = secondClickY;
      secondClickY = firstClickY;
      firstClickY = temp;
    }
    

    saveCoords();
    // clear form
    
    set_state(STATE_SECOND_CLICK);
    render();

    setTimeout(function(){
      clearForm();
      set_state(STATE_NOTHING_CLICK);
      document.getElementById("field_name").style.backgroundColor = "white";
      render();
    }, 500);

  } else {
    set_state(STATE_FIRST_CLICK);
    render();

    firstClickX = event.offsetX;
    firstClickY = event.offsetY;
  }
}
  
// function calculates width and height, given 2 sets of coordinates
// it calculates the distance between the two points as width and height
// inputs: x1,y1,x2,y2
// outputs: an object with properties width, height
function calculateWidthAndHeight(x1,y1,x2,y2){
  var width = x2 - x1;
  var height = y2 - y1;
  return {"width":width, "height":height};
}

function set_value(id, value){
  if(!document.getElementById(id)){
    alert("Tried to set value of input:" + id+" but the input does not exist");
    return;
  }
  document.getElementById(id).value = value;
}

function get_value(id){
  if(!document.getElementById(id)){
    alert("Tried to get value of input:" + id+" but the input does not exist");
    return "ERROR";
  }
  return document.getElementById(id).value;
}
// function button to save coordinates, width and height to a json file
// takes first set of coordinates, second set, width and height
// and the "field_name" input field as the key stores the data
// in the in-memory-array called "coordArray" which is a global variable
// clear local storage of any saved files when user clicks the button
function saveCoords() {
  
  var dimensions = calculateWidthAndHeight(firstClickX, firstClickY, secondClickX, secondClickY);
  console.log(dimensions)
  var input_field = {"field":       get_value("field_name"),
                      "width":      dimensions.width, 
                      "height":     dimensions.height, 
                      "x":          firstClickX, 
                      "y":          firstClickY, 
                      "page_number": get_value("page_number"),
                      "broker_id": get_value("broker_id")};

  set_value("x1", firstClickX);
  set_value("y1", firstClickY);
  set_value("width", dimensions.width);
  set_value("height", dimensions.height);

  coordArray.push(input_field);
  localStorage.setItem("coordArray", JSON.stringify(coordArray));
  
  // auto focus on the field_name field so the user can continue typing
  document.getElementById("field_name").focus();
  
}

function clearLocalStorage() {
  localStorage.clear(coordArray);
}

//showjson the purpose of this function is to show a popup with a 
// textarea where we can copy the json data from the coordArray in-memory array
// the popup has a close button
function showJSON() {
  
  //TODO:
  // onload = 
  //var coordArray = JSON.parse(localStorage.getItem("coordArray"));

  prompt("Copy the text", JSON.stringify(coordArray));
  
}


