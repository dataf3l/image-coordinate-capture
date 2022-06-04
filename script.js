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

/* function saveCoor() {
  document.addEventListener("click", function() {
  ;
  })
}
*/
