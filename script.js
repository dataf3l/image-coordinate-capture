const inpFile = document.getElementById("inpFile")
const previewContainer = document.getElementById("docPreview")
const previewDoc = previewContainer.querySelector(".doc-preview__doc")
const previewDefaultText = previewContainer.querySelector(".doc-preview__default-text")


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

 function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  document.getElementById("coordinates").innerHTML = coor;
  document.getElementById("coordinatex").innerHTML = x;
  document.getElementById("coordinatey").innerHTML = y
}

function clearCoor() {
  document.getElementById("coordinates").innerHTML = "";
}


function saveCoor() {
  document.addEventListener("click", function() {
    var x = document.getElementById("coordinatex").innerHTML;
    var y = document.getElementById("coordinatey").innerHTML;
    var name = document.getElementById("inpFile").value;
    var json = {
      "name": name,
      "x": x,
      "y": y
    }
    var jsonString = JSON.stringify(json);
    var fs = require('fs');
    fs.writeFile("coords.json", jsonString, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
}


function altClick() {
  document.addEventListener("click", function() {
    var x = document.getElementById("coordinatex").innerHTML;
    var y = document.getElementById("coordinatey").innerHTML;
    var width = document.getElementById("coordinatex").innerHTML - document.getElementById("coordinatex").innerHTML;
    var height = document.getElementById("coordinatey").innerHTML - document.getElementById("coordinatey").innerHTML;
    var name = document.getElementById("inpFile").value;
    var json = {
      "name": name,
      "x": x,
      "y": y,
      "width": width,
      "height": height
    }
    var jsonString = JSON.stringify(json);
    var fs = require('fs');
    fs.writeFile("coords.json", jsonString, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }




