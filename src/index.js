//bar and background dimensions
const rectWidth = 3;
const rectHeight = 400;
const spacing = 1;
const numberOfElements = 200;
//let isActive = false;
//const width = numberOfElements * (rectWidth + spacing);
//const height = rectHeight + (spacing * 2);
//const document.getElementById('svgOne').appendChild(rect);
let delay = 0;
let phase = 110;
let width = 100;

let dataset = randomArray(numberOfElements);
let keyVal = [];
for (let i = 0; i < dataset.length; i++) {
  keyVal.push([i, dataset[i]]);
}

insertionSort(dataset);

function mouseClick() {
  //console.log(isActive);
  //if (isActive === false){
  let dataset = randomArray(numberOfElements);
  insertionSort(dataset);
  //}
}

function deleteBars() {
  let delPar = document.getElementById("svgOne");
  while (delPar.firstChild) {
    delPar.removeChild(delPar.firstChild);
  }
}

function createBars(array) {
  deleteBars();
  for (let i in array) {
    if (document.getElementById(i)) {
      let element = document.getElementById(i);
      element.parentNode.removeChild(element);
    }
  }
  for (let i in array) {
    let x = i * (rectWidth + spacing);
    let y = rectHeight;
    let svgns = "http://www.w3.org/2000/svg";
    let rect = document.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y - array[i] * 2 + 3);
    rect.setAttributeNS(null, "height", array[i] * 2 + 3);
    rect.setAttributeNS(null, "width", rectWidth);
    rect.setAttributeNS(null, "fill", colorCycle(array[i], 115));
    rect.setAttributeNS(null, "id", array[i]);
    rect.setAttributeNS(null, "class", "bar");
    document.getElementById("svgOne").appendChild(rect);
  }
}

function randomArray(maxVal) {
  let array = [];
  let m = maxVal;
  let t;
  let i;
  for (i = 0; i < maxVal; i++) {
    array.push(i + 2);
  }
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function insertionSort(unsortedList) {
  //isActive = true;
  //console.log(isActive);
  for (let i = 1; i < unsortedList.length; i++) {
    setTimeout(() => {
      //console.log(unsortedList);
      let tmp = unsortedList[i]; //Copy of the current element.
      /*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
      for (var j = i - 1; j >= 0 && unsortedList[j] > tmp; j--) {
        //Shift the number
        unsortedList[j + 1] = unsortedList[j];
        //if(j < 0) {isActive = false;}
      }
      //Insert the copied number at the correct position
      //in sorted part.
      unsortedList[j + 1] = tmp;
      createBars(unsortedList);
    }, i * 40);
  }
  //console.log(isActive);
  return unsortedList;
}

function colorPhase(input) {
  tmp = (input.clientX % 36) / 6;
  //if (tmp > 4) {tmp -= 4};
  //if (tmp < 0) {tmp += 4};
  phase = tmp;

  //tmp = (input.clientX/2);

  //width = 63 + tmp;
  //console.log(phase);
}

function colorCycle(position) {
  //if (phase == undefined) phase = 0;
  const center = 128;
  const width = 100;
  const frequency = (Math.PI * 2) / numberOfElements;
  let red = Math.sin(frequency * position + 2 + phase) * width + center;
  let green = Math.sin(frequency * position + 0 + phase) * width + center;
  let blue = Math.sin(frequency * position + 4 + phase) * width + center;
  return "rgb(" + red + "," + green + "," + blue + ")";
}
